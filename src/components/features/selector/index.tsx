import Select from "@/components/ui/select";
import { Theme } from "@/themes";
import { useElementSize } from "@mantine/hooks";
import { SelectValue } from "@radix-ui/react-select";
import { ReactElement } from "react";
import { MdArrowDropDown } from "react-icons/md";

import { ProgressArrow, ProgressContent, Root, StyledButton } from "./styles";
import { VARIANTS_STYLES, VariantsType } from "./variants";

interface ISelectorProps {
    options: {
        key: string;
        value: string;
    }[];
    value: string;
    onValueChange: (value: string) => void;
    open?: boolean;
    setOpen?: (option: boolean) => void;
    height?: string;
    variant?: VariantsType;
}

export const Selector = ({
    options,
    value,
    onValueChange,
    open,
    setOpen,
    height = "30px",
    variant = "primary",
}: ISelectorProps): ReactElement => {
    const { ref, width: triggerWidth } = useElementSize();

    return (
        <Root>
            <Select open={open} onOpenChange={setOpen} value={value} onValueChange={onValueChange}>
                <Select.Trigger ariaLabel="Selecione uma opção...">
                    <StyledButton
                        className="StyledButton"
                        variant={variant}
                        height={height}
                        ref={ref}
                    >
                        <ProgressContent>
                            <SelectValue
                                placeholder="Selecione uma opção"
                                title={options.find(option => option.key === value)?.value}
                            />
                        </ProgressContent>

                        <ProgressArrow>
                            <MdArrowDropDown
                                size={14}
                                color={Theme.colors[VARIANTS_STYLES[variant].color]}
                            />
                        </ProgressArrow>
                    </StyledButton>
                </Select.Trigger>

                <Select.Content width={triggerWidth}>
                    <Select.Group label="FONTES">
                        {options.map(option => (
                            <Select.Item
                                key={`progress-${option.key}`}
                                value={option.key}
                                text={option.value}
                                color="black"
                            />
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select>
        </Root>
    );
};
