import type { Metadata } from "next";
import { ReactElement, ReactNode } from "react";

import ModelWrapProviders from "./model-wrap-providers";

export const metadata: Metadata = {
    title: "FlexRelat - Modelo",
    description: "Generated reports with AI",
};

export default function DocumentLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement {
    return <ModelWrapProviders>{children}</ModelWrapProviders>;
}
