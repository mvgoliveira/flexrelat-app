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
    h6 {
        line-height: 3;
    }

    p,
    ul,
    ol,
    li,
    blockquote,
    table,
    th,
    td {
        line-height: 1.5;
    }

    tr {
        th {
            background: ${({ theme }) => theme.colors.gray30};
            border: 1px solid ${({ theme }) => theme.colors.gray50};
            padding: 8px;
        }

        td {
            border: 1px solid ${({ theme }) => theme.colors.gray50};
            padding: 8px;
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
        background: ${({ theme }) => theme.colors.gray20};
        padding: 2px 4px;
        border-radius: 4px;
        font-family: monospace;
    }
`;
