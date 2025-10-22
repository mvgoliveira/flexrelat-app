import { Spinner } from "@/components/features/loading/spinner";
import { client } from "@/services/client";
import React, { useEffect, useState, ComponentType, ReactElement } from "react";

const redirectToLogin = (): void => {
    if (typeof window === "object") {
        localStorage.removeItem("metadata");
        window.location.href = "/login";
    }
};

const withSession = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
    const WithSession = (props: P): ReactElement => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const run = async () => {
                try {
                    await client.get("/users/me");
                    localStorage.removeItem("redirectUrl");
                    setLoading(false);
                } catch {
                    localStorage.setItem("redirectUrl", location.href);
                    redirectToLogin();
                }
            };
            run();
        }, []);

        if (loading)
            return (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100vw",
                        height: "100vh",
                        background: "#f6f6f6",
                    }}
                >
                    <Spinner />
                </div>
            );

        return <WrappedComponent {...props} />;
    };

    WithSession.displayName = `withSession(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return WithSession;
};

export default withSession;
