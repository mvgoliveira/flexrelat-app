import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactElement } from "react";

import "@/styles/globals.css";
import WrapProviders from "./wrap-providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FlexReports",
    description: "Generated reports with AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): ReactElement {
    return (
        <html lang="pt-BR">
            <body
                className={`${geistSans.variable} ${geistMono.variable}`}
                suppressHydrationWarning
            >
                <WrapProviders>{children}</WrapProviders>
            </body>
        </html>
    );
}
