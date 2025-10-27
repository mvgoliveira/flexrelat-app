import { client } from "@/services/client";

export const PREFIX = "/users";

export type User = {
    id: string;
    uid: string;
    username: string;
    email: string;
    emailVerified: boolean;
};

export const getAuthenticatedUser = async (): Promise<User> => {
    const { data } = await client.get<User>(`${PREFIX}/me`);
    return data;
};
