"use client";

import { UserProvider } from "@/context/userContext";
import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import { ThemeProvider } from "@emotion/react";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";

export default function WrapProviders({ children }: IReactChildren): ReactElement {
    const queryClient = new QueryClient();
    const mantineTheme = createTheme({});

    return (
        <UserProvider>
            <ThemeProvider theme={Theme}>
                <MantineProvider theme={mantineTheme}>
                    <QueryClientProvider client={queryClient}>
                        <SkeletonTheme
                            baseColor={Theme.colors.gray40}
                            highlightColor={Theme.colors.gray10}
                        >
                            <Toaster position="top-right" reverseOrder={false} />
                            {children}
                        </SkeletonTheme>
                    </QueryClientProvider>
                </MantineProvider>
            </ThemeProvider>
        </UserProvider>
    );
}
