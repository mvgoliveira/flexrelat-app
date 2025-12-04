"use client";

import { ModelProvider } from "@/context/modelContext";
import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

export default function ModelWrapProviders({ children }: IReactChildren): ReactElement {
    return <ModelProvider>{children}</ModelProvider>;
}
