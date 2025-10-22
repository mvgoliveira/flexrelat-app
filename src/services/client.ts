import axios from "axios";

const getAPIHostByHostname = (): string => {
    const isClient = typeof window === "object";

    if (isClient) {
        return process.env.NEXT_PUBLIC_API_URL!;
    }

    return process.env.NEXT_PUBLIC_API_URL!;
};

const client = axios.create({
    baseURL: getAPIHostByHostname(),
    withCredentials: true,
});

export { client };
