import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 100%;
    width: 100%;
    max-width: 100vw;
    align-items: center;
    overflow: hidden;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 100%;
    overflow: hidden;
`;

export const MenuBottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    cursor: pointer;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 100%;
`;

export const TitleContent = styled.div<{ hasTitle: boolean }>`
    display: flex;
    align-items: center;
    width: fit-content;
    max-width: calc(100vw - 407px - 40px - 45px);
    overflow: hidden;
    padding: 1px;
    white-space: nowrap;

    h1 {
        color: ${({ theme, hasTitle }) => (hasTitle ? theme.colors.gray100 : theme.colors.gray70)};
        min-width: 9px;

        [contenteditable="true"] {
            all: unset;
            white-space: pre-wrap;
        }
    }
`;

export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    min-width: fit-content;
    /* height: 100%; */
`;
