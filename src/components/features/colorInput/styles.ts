import styled from "@emotion/styled";
import { ColorInput as MantineColorInput } from "@mantine/core";

export const StyledColorInput = styled(MantineColorInput)`
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 4px;

    .mantine-Input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
    }

    .mantine-Input-input {
        width: 100%;
        font-size: ${({ theme }) => theme.fontSize.fs75};
        font-family: ${({ theme }) => theme.fontFamily.inter} !important;
        color: ${({ theme }) => theme.colors.black};
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        border: 1px solid ${({ theme }) => theme.colors.gray40};

        &:focus {
            border: 1px solid ${({ theme }) => theme.colors.blue60};
            box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blue10};
        }
    }

    .mantine-Input-section {
        button {
            all: unset;

            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 4px;

            &:hover {
                background-color: ${({ theme }) => theme.colors.gray10};
            }
        }
    }

    .mantine-focus-auto {
        span {
            border-radius: 4px !important;
        }
    }
`;
