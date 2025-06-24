import { Theme } from "@/themes";
import { ReactElement } from "react";
import { MdSearch } from "react-icons/md";

import { Root, StyledIcon, StyledInput } from "./styles";

interface ISearchInputProps {
    placeholder?: string;
}

export const SearchInput = ({
    placeholder = "Pesquise por nome do grupo...",
}: ISearchInputProps): ReactElement => {
    return (
        <Root>
            <StyledInput placeholder={placeholder} />

            <StyledIcon>
                <MdSearch size={14} color={Theme.colors.white} />
            </StyledIcon>
        </Root>
    );
};
