"use client";

import { DocumentProvider } from "@/context/documentContext";
import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

export default function DocumentWrapProviders({ children }: IReactChildren): ReactElement {
    return <DocumentProvider>{children}</DocumentProvider>;
}
