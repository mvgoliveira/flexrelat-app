import { hexToRgba } from "@/utils/hexToRgba";
import styled from "@emotion/styled";

export const StyledContent = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 25px;
`;

export const DeleteInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    border: 1px solid ${({ theme }) => theme.colors.red40};
    background-color: ${({ theme }) => hexToRgba(theme.colors.red40, 30)};
    border-radius: 4px;
    padding: 8px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
`;
