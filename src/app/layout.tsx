import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactElement } from "react";

import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import WrapProviders from "./wrap-providers";

export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "FlexRelat",
    description: "Generated reports with AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): ReactElement {
    return (
        <html lang="pt-BR">
            <body className={inter.className} suppressHydrationWarning>
                <WrapProviders>{children}</WrapProviders>
            </body>
        </html>
    );
}
