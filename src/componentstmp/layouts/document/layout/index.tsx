import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

import {
    Root,
    SecondaryRoot,
    StyledContent,
    StyledHeader,
    StyledLeftNavbar,
    StyledRightNavbar,
} from "./styles";

const Layout = ({ children }: IReactChildren): ReactElement => {
    return <Root>{children}</Root>;
};

const SecondaryLayout = ({ children }: IReactChildren): ReactElement => {
    return <SecondaryRoot>{children}</SecondaryRoot>;
};

const Header = ({ children }: IReactChildren): ReactElement => {
    return <StyledHeader className="no-print">{children}</StyledHeader>;
};
Layout.Header = Header;

const Content = ({ children }: IReactChildren): ReactElement => {
    return <StyledContent>{children}</StyledContent>;
};
Layout.Content = Content;

const LeftNavBar = ({ children }: IReactChildren): ReactElement => {
    return <StyledLeftNavbar className="no-print">{children}</StyledLeftNavbar>;
};
Layout.LeftNavBar = LeftNavBar;

const RightNavBar = ({ children }: IReactChildren): ReactElement => {
    return <StyledRightNavbar className="no-print">{children}</StyledRightNavbar>;
};
Layout.RightNavBar = RightNavBar;

export { Layout, SecondaryLayout };
