import styled from "@emotion/styled";

export const StyledContent = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 25px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
`;

export const OptionCard = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    gap: 5px;
    border: 1px solid
        ${props => (props.isSelected ? props.theme.colors.blue50 : props.theme.colors.gray40)};
    border-radius: 4px;
    background-color: ${props =>
        props.isSelected ? props.theme.colors.blue20 : props.theme.colors.white};
    cursor: pointer;

    &:hover {
        border-color: ${props => props.theme.colors.blue100};
    }
`;
