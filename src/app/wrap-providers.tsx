"use client";

import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import { ThemeProvider } from "@emotion/react";
import { ReactElement } from "react";

export default function WrapProviders({ children }: IReactChildren): ReactElement {
    return <ThemeProvider theme={Theme}> {children} </ThemeProvider>;
}
