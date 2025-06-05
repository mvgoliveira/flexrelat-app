import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { ITypography } from ".";

// @ts-ignore
export const StyledTypography = styled.h1<ITypography>`
    ${({ theme, color, fontWeight, fontFamily, textAlign, fontSize }) => css`
        margin: 0;
        padding: 0;
        text-align: ${textAlign};
        color: ${theme.colors[color as keyof typeof theme.colors]};
        font-weight: ${theme.fontWeight[fontWeight as keyof typeof theme.fontWeight]};
        font-family: ${theme.fontFamily[fontFamily as keyof typeof theme.fontFamily]};

        @media screen and (max-width: 576px) {
            font-size: ${theme.fontSize[fontSize?.xs as keyof typeof theme.fontSize]};
            line-height: ${theme.lineHeight[fontSize?.xs as keyof typeof theme.lineHeight]};
            letter-spacing: ${theme.letterSpacing[
                fontSize?.xs as keyof typeof theme.letterSpacing
            ]};
        }

        @media screen and (min-width: 576px) {
            font-size: ${theme.fontSize[fontSize?.sm as keyof typeof theme.fontSize]};
            line-height: ${theme.lineHeight[fontSize?.sm as keyof typeof theme.lineHeight]};
            letter-spacing: ${theme.letterSpacing[
                fontSize?.sm as keyof typeof theme.letterSpacing
            ]};
        }

        @media screen and (min-width: 768px) {
            font-size: ${theme.fontSize[fontSize?.md as keyof typeof theme.fontSize]};
            line-height: ${theme.lineHeight[fontSize?.md as keyof typeof theme.lineHeight]};
            letter-spacing: ${theme.letterSpacing[
                fontSize?.md as keyof typeof theme.letterSpacing
            ]};
        }

        @media screen and (min-width: 1000px) {
            font-size: ${theme.fontSize[fontSize?.lg as keyof typeof theme.fontSize]};
            line-height: ${theme.lineHeight[fontSize?.lg as keyof typeof theme.lineHeight]};
            letter-spacing: ${theme.letterSpacing[
                fontSize?.lg as keyof typeof theme.letterSpacing
            ]};
        }

        @media screen and (min-width: 1200px) {
            font-size: ${theme.fontSize[fontSize?.xl as keyof typeof theme.fontSize]};
            line-height: ${theme.lineHeight[fontSize?.xl as keyof typeof theme.lineHeight]};
            letter-spacing: ${theme.letterSpacing[
                fontSize?.xl as keyof typeof theme.letterSpacing
            ]};
        }

        @media screen and (min-width: 1400px) {
            font-size: ${theme.fontSize[fontSize?.xxl as keyof typeof theme.fontSize]};
            line-height: ${theme.lineHeight[fontSize?.xxl as keyof typeof theme.lineHeight]};
            letter-spacing: ${theme.letterSpacing[
                fontSize?.xxl as keyof typeof theme.letterSpacing
            ]};
        }
    `}
`;
