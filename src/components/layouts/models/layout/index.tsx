import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

import {
    Root,
    SecondaryRoot,
    StyledContainer,
    StyledContent,
    StyledHeader,
    StyledNavbar,
} from "./styles";

const SecondaryLayout = ({ children }: IReactChildren): ReactElement => {
    return <SecondaryRoot>{children}</SecondaryRoot>;
};

const Layout = ({ children }: IReactChildren): ReactElement => {
    return <Root>{children}</Root>;
};

const NavBar = ({ children }: IReactChildren): ReactElement => {
    return <StyledNavbar className="no-print">{children}</StyledNavbar>;
};
Layout.NavBar = NavBar;

const Content = ({ children }: IReactChildren): ReactElement => {
    return <StyledContent>{children}</StyledContent>;
};
Layout.Content = Content;

const Container = ({ children }: IReactChildren): ReactElement => {
    return <StyledContainer>{children}</StyledContainer>;
};
Content.Container = Container;

const Header = ({ children }: IReactChildren): ReactElement => {
    return <StyledHeader className="no-print">{children}</StyledHeader>;
};
Content.Header = Header;

export { Layout, SecondaryLayout };
