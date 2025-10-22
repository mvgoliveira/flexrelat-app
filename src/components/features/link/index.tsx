import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import NextLink from "next/link";
import React, { ReactElement } from "react";

import { Typography, ITypography } from "../typography";
import { StyledLink, StyledLinkText } from "./styles";

export interface ILink extends IReactChildren {
    href: string;
    /**
     * Target do link:
     * - "next": Usa o roteamento do Next.js (padrão, recomendado para rotas internas)
     * - "_blank": Abre em nova aba
     * - "_self": Abre na mesma aba
     * - "_parent": Abre no frame pai
     * - "_top": Abre na janela toda
     */
    target?: "_blank" | "_self" | "_parent" | "_top" | "next";
    rel?: string;
    underline?: boolean;
    lineColor?: keyof typeof Theme.colors;
    color?: keyof typeof Theme.colors;
    hoverColor?: keyof typeof Theme.colors;
    typographyProps?: Omit<ITypography, "children" | "tag">;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Link = ({
    href,
    target = "next",
    rel,
    underline = true,
    lineColor = "black",
    color = "black",
    hoverColor = "black",
    typographyProps,
    onClick,
    children,
}: ILink): ReactElement => {
    const defaultRel = target === "_blank" ? "noopener noreferrer" : undefined;
    const isNextRouting = target === "next";

    const linkContent = (
        <Typography tag="span" color={color} {...typographyProps}>
            {children}
        </Typography>
    );

    if (isNextRouting) {
        return (
            <NextLink href={href} passHref>
                <StyledLinkText
                    color={color}
                    underline={underline}
                    hoverColor={hoverColor}
                    onClick={onClick}
                    lineColor={lineColor}
                >
                    {linkContent}
                </StyledLinkText>
            </NextLink>
        );
    }

    return (
        <StyledLink
            href={href}
            target={target}
            rel={rel || defaultRel}
            color={color}
            underline={underline}
            hoverColor={hoverColor}
            lineColor={lineColor}
            onClick={onClick}
        >
            {linkContent}
        </StyledLink>
    );
};

export { Link };
