import { Theme } from "@/themes";
import { hexToRgba } from "@/utils/hexToRgba";
import { tags as t } from "@lezer/highlight";
import createTheme from "@uiw/codemirror-themes";

export const CUSTOM_THEME = createTheme({
    theme: "light",
    settings: {
        fontSize: Theme.fontSize.fs75,
        fontFamily: Theme.fontFamily.roboto,
        background: Theme.colors.gray10,
        backgroundImage: "",
        foreground: Theme.colors.black,
        caret: Theme.colors.black,
        selection: String(hexToRgba(Theme.colors.blue50, 40)),
        selectionMatch: Theme.colors.blue50,
        lineHighlight: String(hexToRgba(Theme.colors.gray10, 8)),
        gutterBackground: Theme.colors.gray20,
        gutterForeground: Theme.colors.gray70,
    },
    styles: [
        { tag: t.comment, color: Theme.colors.white },
        { tag: t.variableName, color: Theme.colors.white },
        { tag: [t.string, t.special(t.brace)], color: Theme.colors.white },
        { tag: t.number, color: Theme.colors.white },
        { tag: t.bool, color: Theme.colors.white },
        { tag: t.null, color: Theme.colors.white },
        { tag: t.keyword, color: Theme.colors.white },
        { tag: t.operator, color: Theme.colors.white },
        { tag: t.className, color: Theme.colors.white },
        { tag: t.definition(t.typeName), color: Theme.colors.white },
        { tag: t.typeName, color: Theme.colors.white },
        { tag: t.angleBracket, color: Theme.colors.white },
        { tag: t.tagName, color: Theme.colors.white },
        { tag: t.attributeName, color: Theme.colors.white },
    ],
});
