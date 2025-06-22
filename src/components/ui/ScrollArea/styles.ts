import styled from "@emotion/styled";
import {
    Root as ScrollRoot,
    Viewport as ScrollViewport,
    Scrollbar,
    Thumb as ScrollThumb,
    Corner as ScrollCorner,
} from "@radix-ui/react-scroll-area";

export const StyledScrollRoot = styled(ScrollRoot)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 2px 10px ${({ theme }) => theme.colors.gray20};
    --scrollbar-size: 10px;
`;

export const StyledScrollViewport = styled(ScrollViewport)`
    width: 100%;
    height: 100%;
    border-radius: inherit;
`;

export const StyledScrollbar = styled(Scrollbar)`
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    background: ${({ theme }) => theme.colors.gray20};
    transition: background 160ms ease-out;

    &:hover {
        background: ${({ theme }) => theme.colors.gray30};
    }

    &[data-orientation="vertical"] {
        width: 8px;
    }

    &[data-orientation="horizontal"] {
        flex-direction: column;
        height: 8px;
    }
`;

export const StyledScrollThumb = styled(ScrollThumb)`
    flex: 1;
    background: ${({ theme }) => theme.colors.gray50};
    border-radius: 8px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 44px;
        min-height: 44px;
    }
`;

export const StyledScrollCorner = styled(ScrollCorner)`
    background: ${({ theme }) => theme.colors.gray40};
`;
