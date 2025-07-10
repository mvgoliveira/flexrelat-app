import { hexToRgba } from "@/utils/hexToRgba";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface IRootProps {
    zoom: number;
    marginRight: number;
    marginLeft: number;
    marginTop: number;
    marginBottom: number;
    pageWidth: number;
    pageHeight: number;
}

const loadingSkeleton = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const Root = styled.div<IRootProps>`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.white};
    min-width: ${({ pageWidth }) => `${pageWidth}px`};
    max-width: ${({ pageWidth }) => `${pageWidth}px`};
    zoom: ${({ zoom }) => zoom};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    font-size: ${({ theme }) => theme.fontSize.fs75};
    font-family: ${({ theme }) => theme.fontFamily.arial};

    .ProseMirror {
        &:focus {
            outline: none;
        }
    }

    .rm-pagination-gap {
        border-top: 1px solid ${({ theme }) => theme.colors.gray30};
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    }

    .rm-with-pagination {
        padding: ${({ marginLeft, marginRight }) => `0 ${marginRight}px 0 ${marginLeft}px`};
    }

    .rm-page-footer,
    .rm-first-page-header,
    .rm-page-header {
        min-width: ${({ marginLeft, marginRight }) =>
            `calc(100% + ${marginLeft}px + ${marginRight}px)`} !important;
        margin-left: ${({ marginLeft }) => `${-marginLeft}px`} !important;
    }

    .rm-pagination-gap {
        min-width: ${({ marginLeft, marginRight }) =>
            `calc(100% + ${marginLeft}px + ${marginRight}px + 2px)`} !important;
        margin-left: ${({ marginLeft }) => `${-marginLeft}px`} !important;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin-bottom: 12px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: ${({ theme }) => theme.fontSize.fs100};
        line-height: ${({ theme }) => theme.lineHeight.fs100};
    }

    h1 {
        counter-increment: h1;
        counter-reset: h2;
    }
    h2 {
        counter-increment: h2;
        counter-reset: h3;
    }
    h3 {
        counter-increment: h3;
    }
    h1::before {
        content: counter(h1) ". ";
    }
    h2::before {
        content: counter(h1) "." counter(h2) ". ";
    }
    h3::before {
        content: counter(h1) "." counter(h2) "." counter(h3) ". ";
    }

    .change-add {
        counter-increment: none !important;
    }
    h1.change-add::before {
        content: counter(h1) ". ";
    }
    h2.change-add::before {
        content: counter(h1) "." counter(h2) ". ";
    }
    h3.change-add::before {
        content: counter(h1) "." counter(h2) "." counter(h3) ". ";
    }

    table {
        border-collapse: collapse;
        overflow: hidden;
        table-layout: fixed;
        width: 100%;

        tr {
            &:last-of-type {
                margin-bottom: 12px;
            }

            .selectedCell:after {
                background: ${({ theme }) => hexToRgba(theme.colors.blue50, 10)};
                content: "";
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                pointer-events: none;
                position: absolute;
                z-index: 2;
            }
        }

        td,
        th {
            border-right: 1px solid ${({ theme }) => theme.colors.gray50};
            border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
            box-sizing: border-box;
            padding: 12px 8px;
            position: relative;
            vertical-align: top;

            > * {
                margin-bottom: 0;
            }

            &:first-of-type {
                border-left: 1px solid ${({ theme }) => theme.colors.gray50};
            }
        }

        th {
            background: ${({ theme }) => theme.colors.gray30};
            font-weight: ${({ theme }) => theme.fontWeight.bold};
            text-align: center;
            border-top: 1px solid ${({ theme }) => theme.colors.gray50};
        }

        /* .column-resize-handle {
            background-color: ${({ theme }) => theme.colors.purple50};
            bottom: -2px;
            pointer-events: none;
            position: absolute;
            right: -2px;
            top: 0;
            width: 4px;
        } */
    }

    /* .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
    } */

    ul {
        display: flex;
        flex-direction: column;
        list-style-type: disc;
        padding-left: 20px;
        gap: 12px;
        margin-bottom: 12px;
        font-size: ${({ theme }) => theme.fontSize.fs75};
        line-height: 150%;

        p {
            margin-bottom: 0;
        }

        li ul {
            list-style-type: circle;
            padding-left: 20px;
        }
        li ol {
            list-style-type: decimal;
            padding-left: 20px;
        }

        ul,
        ol {
            margin-top: 12px;
            margin-bottom: 0px;
        }
    }

    code {
        background: ${({ theme }) => theme.colors.gray30};
        border: 1.5px solid ${({ theme }) => theme.colors.gray50};
        padding: 2px 4px;
        border-radius: 4px;
        font-size: ${({ theme }) => theme.fontSize.fs75};
        font-family: monospace;
    }

    .multi-selected {
        outline: 1px solid ${({ theme }) => hexToRgba(theme.colors.purple50, 80)};
        outline-offset: 5px;
        background: ${({ theme }) => hexToRgba(theme.colors.purple50, 10)};
        box-shadow:
            0 0 0 0px ${({ theme }) => hexToRgba(theme.colors.purple50, 10)},
            0 0 0 5px ${({ theme }) => hexToRgba(theme.colors.purple50, 10)};

        .selectedCell:after {
            background: transparent;
            content: "";
        }
    }

    .change-remove {
        outline-offset: 5px;
        background: ${({ theme }) => hexToRgba(theme.colors.red50, 15)};
        box-shadow:
            0 0 0 0px ${({ theme }) => hexToRgba(theme.colors.red50, 15)},
            0 0 0 5px ${({ theme }) => hexToRgba(theme.colors.red50, 15)};
        color: ${({ theme }) => hexToRgba(theme.colors.red100, 50)};
        outline: none;
    }

    .change-add {
        outline-offset: 5px;
        background: ${({ theme }) => hexToRgba(theme.colors.green50, 20)};
        box-shadow:
            0 0 0 0px ${({ theme }) => hexToRgba(theme.colors.green50, 20)},
            0 0 0 5px ${({ theme }) => hexToRgba(theme.colors.green50, 20)};
        color: ${({ theme }) => theme.colors.green100};
        outline: none;
    }

    .change-loading {
        position: relative;
        outline: 1px solid ${({ theme }) => hexToRgba(theme.colors.purple50, 80)};
        outline-offset: 5px;

        &::before {
            content: "";
            position: absolute;
            inset: -5px;
            background: linear-gradient(
                90deg,
                ${({ theme }) => hexToRgba(theme.colors.purple50, 10)} 0%,
                ${({ theme }) => hexToRgba(theme.colors.purple50, 30)} 50%,
                ${({ theme }) => hexToRgba(theme.colors.purple50, 10)} 100%
            );
            background-size: 200% 100%;
            animation: ${loadingSkeleton} 1.5s infinite linear;
            z-index: 1;
        }
    }
`;
