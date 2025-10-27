import type { Metadata } from "next";
import { ReactElement, ReactNode } from "react";

import DocumentWrapProviders from "./doc-wrap-providers";

export const metadata: Metadata = {
    title: "FlexRelat - Documento",
    description: "Generated reports with AI",
};

export default function DocumentLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement {
    return <DocumentWrapProviders>{children}</DocumentWrapProviders>;
}
