import styled from "@emotion/styled";
import { Root as CheckboxRoot, Indicator as CheckboxIndicator } from "@radix-ui/react-checkbox";

export const Root = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    label {
        cursor: pointer;
    }
`;

export const StyledCheckBox = styled(CheckboxRoot)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.gray50};
    border-radius: 2px;
    padding: 0;
    border: none;
    cursor: pointer;
`;

export const StyledIndicator = styled(CheckboxIndicator)`
    display: flex;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.purple50};
    border: 1px solid ${({ theme }) => theme.colors.purple80};
    border-radius: 2px;
`;
