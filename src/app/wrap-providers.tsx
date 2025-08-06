"use client";

import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import { ThemeProvider } from "@emotion/react";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

export default function WrapProviders({ children }: IReactChildren): ReactElement {
    const queryClient = new QueryClient();
    const mantineTheme = createTheme({});

    return (
        <ThemeProvider theme={Theme}>
            <MantineProvider theme={mantineTheme}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </MantineProvider>
        </ThemeProvider>
    );
}
