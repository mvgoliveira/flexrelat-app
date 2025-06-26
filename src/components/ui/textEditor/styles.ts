import { hexToRgba } from "@/utils/hexToRgba";
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

export const Root = styled.div<IRootProps>`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.white};
    min-width: ${({ pageWidth }) => `${pageWidth}px`};
    zoom: ${({ zoom }) => zoom};
    border: 1px solid ${({ theme }) => theme.colors.gray30};

    .ProseMirror {
        &:focus {
            outline: none;
        }
    }

    .tiptap {
        [data-id] {
            border: 2px solid ${({ theme }) => theme.colors.black};
            border-radius: 0.5rem;
            padding: 2.5rem 1rem 1rem;
            position: relative;

            &::before {
                background-color: ${({ theme }) => theme.colors.black};
                border-radius: 0 0 0.5rem 0;
                color: ${({ theme }) => theme.colors.white};
                content: attr(data-id);
                font-size: 0.75rem;
                font-weight: bold;
                left: 0;
                line-height: 1.5;
                padding: 0.25rem 0.5rem;
                position: absolute;
                top: 0;
            }
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

    font-size: ${({ theme }) => theme.fontSize.fs75};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.5;
        margin: 15px 0;
        font-size: ${({ theme }) => theme.fontSize.fs100};
    }

    p,
    ul,
    ol,
    li,
    blockquote {
        line-height: 1.5;
    }

    table {
        border-collapse: collapse;
        overflow: hidden;
        table-layout: fixed;
        width: 100%;

        tr {
            &:first-of-type {
                margin-top: 8px;
            }

            &:last-of-type {
                margin-bottom: 8px;
            }
        }

        td,
        th {
            border: 1px solid ${({ theme }) => theme.colors.gray50};
            box-sizing: border-box;
            padding: 6px 8px;
            position: relative;
            vertical-align: top;

            > * {
                margin-bottom: 0;
            }
        }

        th {
            background: ${({ theme }) => theme.colors.gray30};
            font-weight: ${({ theme }) => theme.fontWeight.bold};
            text-align: center;
        }

        .selectedCell:after {
            background: ${({ theme }) => hexToRgba(theme.colors.purple50, 10)};
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

    ul {
        list-style-type: disc;
        padding-left: 20px;
        li {
            margin-bottom: 8px;
        }
        li ul {
            list-style-type: circle;
            padding-left: 20px;
            li {
                margin-bottom: 4px;
            }
        }
        li ol {
            list-style-type: decimal;
            padding-left: 20px;
            li {
                margin-bottom: 4px;
            }
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

        tr {
            outline: 1px solid ${({ theme }) => theme.colors.purple50};
            background: ${({ theme }) => hexToRgba(theme.colors.purple50, 10)};
        }
    }
`;
