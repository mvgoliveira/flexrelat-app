import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FlexRelat - Documentos",
    description: "Generated reports with AI",
};

export default function DocumentsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactNode {
    return children;
}
