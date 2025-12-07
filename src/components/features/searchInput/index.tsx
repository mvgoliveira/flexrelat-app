import { Theme } from "@/themes";
import { ReactElement } from "react";
import { MdSearch } from "react-icons/md";

import { Root, StyledIcon, StyledInput } from "./styles";

interface ISearchInputProps {
    placeholder?: string;
    hasShadow?: boolean;
    onChange: (value: string) => void;
}

export const SearchInput = ({
    placeholder = "Buscar",
    hasShadow = false,
    onChange,
}: ISearchInputProps): ReactElement => {
    return (
        <Root hasShadow={hasShadow}>
            <StyledIcon>
                <MdSearch size={14} color={Theme.colors.gray70} />
            </StyledIcon>

            <StyledInput placeholder={placeholder} onChange={e => onChange(e.target.value)} />
        </Root>
    );
};
