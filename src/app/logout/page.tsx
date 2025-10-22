"use client";

import { client } from "@/services/client";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

export default function LogoutPage(): ReactElement {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await client.post("/auth/logout");
            } catch (error) {
                console.error("Erro ao fazer logout:", error);
            } finally {
                router.push("/login");
            }
        };

        handleLogout();
    }, [router]);

    return <></>;
}
