import { FlatCompat } from "@eslint/eslintrc";
import yakPlugin from "eslint-plugin-yak";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    yakPlugin.configs.recommended,
    ...compat.config({
        extends: [
            "next",
            "next/core-web-vitals",
            "next/typescript",
            "plugin:prettier/recommended",
            "plugin:jsx-a11y/recommended",
        ],
        plugins: ["jsx-a11y", "unused-imports", "eslint-plugin-import-helpers", "prettier"],
        rules: {
            "prettier/prettier": [
                "error",
                {
                    trailingComma: "all",
                    semi: false,
                    tabWidth: 4,
                    singleQuote: true,
                    printWidth: 80,
                    endOfLine: "auto",
                    arrowParens: "always",
                    plugins: ["prettier-plugin-tailwindcss"],
                },
                {
                    usePrettierrc: false,
                },
            ],
            "react/react-in-jsx-scope": "off",
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/aria-props": "warn",
            "jsx-a11y/aria-proptypes": "warn",
            "jsx-a11y/aria-unsupported-elements": "warn",
            "jsx-a11y/role-has-required-aria-props": "warn",
            "jsx-a11y/role-supports-aria-props": "warn",
            "no-console": "off",
            "class-methods-use-this": "off",
            "no-useless-constructor": "off",
            "prettier/prettier": "error",
            "no-shadow": "off",
            quotes: [
                "error",
                "double",
                {
                    allowTemplateLiterals: true,
                },
            ],
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/prop-types": "off",
            "react/no-array-index-key": "off",
            "import-helpers/order-imports": [
                "warn",
                {
                    newlinesBetween: "always",
                    groups: ["module", ["parent", "sibling", "index"]],
                    alphabetize: {
                        order: "asc",
                        ignoreCase: true,
                    },
                },
            ],
            "import/no-unresolved": [2],
            "import/prefer-default-export": "off",
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    js: "never",
                    jsx: "never",
                    ts: "never",
                    tsx: "never",
                },
            ],
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    ignoreRestSiblings: true,
                    destructuredArrayIgnorePattern: "[A-Z]",
                    caughtErrors: "none",
                },
            ],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-module-boundary-types": [
                "warn",
                {
                    allowArgumentsExplicitlyTypedAsAny: true,
                },
            ],
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "interface",
                    format: ["PascalCase"],
                    custom: {
                        regex: "^I[A-Z]",
                        match: true,
                    },
                },
            ],
            "@typescript-eslint/no-shadow": "error",
        },
        settings: {
            "import/resolver": {
                typescript: {
                    project: "tsconfig.json",
                },
            },
        },
    }),
];

export default eslintConfig;
