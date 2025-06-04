/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@emotion/react";
import { ThemeType } from "@/themes";

declare module "@emotion/react" {
    export interface Theme extends ThemeType {}
}
