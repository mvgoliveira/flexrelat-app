import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FlexRelat - Login",
    description: "Generated reports with AI",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactNode {
    return children;
}
