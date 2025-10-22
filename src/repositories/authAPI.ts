import { client } from "@/services/client";

const PREFIX = "/auth";

export type LoginResponse = {
    user: {
        id: string;
        username: string;
        email: string;
        emailVerified: boolean;
    };
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await client.post<LoginResponse>(`${PREFIX}/login`, {
        email,
        password,
    });
    return data;
};
