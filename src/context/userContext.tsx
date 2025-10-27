import { User } from "@/repositories/userAPI";
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type UserContextType = {
    authenticatedUser: User | null;
    setAuthenticatedUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

    return (
        <UserContext.Provider
            value={{
                authenticatedUser,
                setAuthenticatedUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext deve ser usado dentro de UserProvider");
    }

    return context;
}
