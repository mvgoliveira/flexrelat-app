import { Theme } from "@/themes";
import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 5px;
`;

export const BubbleActionsContainer = styled.div`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray30};
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    width: fit-content;
    height: 30px;
    overflow: hidden;
`;

export const StyledButton = styled.button<{ color: keyof typeof Theme.colors }>`
    position: relative;
    display: flex;
    width: 20px;
    min-width: 20px;
    height: 20px;
    background: ${({ theme, color }) => theme.colors[color]};
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
        filter: brightness(0.95);
    }
`;
