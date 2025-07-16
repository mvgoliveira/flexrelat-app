import { Theme } from "@/themes";
import { ReactElement } from "react";
import { MdSearch } from "react-icons/md";

import { Root, StyledIcon, StyledInput } from "./styles";

interface ISearchInputProps {
    placeholder?: string;
}

export const SearchInput = ({ placeholder = "Buscar" }: ISearchInputProps): ReactElement => {
    return (
        <Root>
            <StyledIcon>
                <MdSearch size={14} color={Theme.colors.gray70} />
            </StyledIcon>

            <StyledInput placeholder={placeholder} />
        </Root>
    );
};
