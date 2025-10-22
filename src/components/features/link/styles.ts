import { Theme } from "@/themes";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IStyledLink {
    color: keyof typeof Theme.colors;
    underline: boolean;
    hoverColor: keyof typeof Theme.colors;
    lineColor: keyof typeof Theme.colors;
}

export const StyledLink = styled.a<IStyledLink>`
    ${({ theme, underline, hoverColor, lineColor }) => css`
        cursor: pointer;
        text-decoration: ${underline ? "underline" : "none"};
        text-decoration-color: ${underline ? theme.colors[lineColor] : "transparent"};
        transition: color 0.2s ease-in-out;

        &:hover {
            span {
                color: ${theme.colors[hoverColor]};
            }
        }

        &:focus {
            outline: 2px solid ${theme.colors[hoverColor]};
            outline-offset: 2px;
            border-radius: 2px;
        }

        &:active {
            opacity: 0.8;
        }
    `}
`;

export const StyledLinkText = styled.span<IStyledLink>`
    ${({ theme, underline, hoverColor, lineColor }) => css`
        cursor: pointer;
        text-decoration: ${underline ? "underline" : "none"};
        text-decoration-color: ${underline ? theme.colors[lineColor] : "transparent"};
        transition: color 0.2s ease-in-out;

        &:hover {
            span {
                color: ${theme.colors[hoverColor]};
            }
        }

        &:focus {
            outline: 2px solid ${theme.colors[hoverColor]};
            outline-offset: 2px;
            border-radius: 2px;
        }

        &:active {
            opacity: 0.8;
        }
    `}
`;
