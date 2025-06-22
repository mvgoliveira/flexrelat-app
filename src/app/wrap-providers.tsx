"use client";

import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

export default function WrapProviders({ children }: IReactChildren): ReactElement {
    const queryClient = new QueryClient();

    return (
        <ThemeProvider theme={Theme}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
    );
}
