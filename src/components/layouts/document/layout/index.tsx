import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

import { Root, StyledContent, StyledHeader, StyledLeftNavbar, StyledRightNavbar } from "./styles";

const Layout = ({ children }: IReactChildren): ReactElement => {
    return <Root>{children}</Root>;
};

const Header = (): ReactElement => {
    return <StyledHeader></StyledHeader>;
};
Layout.Header = Header;

const Content = ({ children }: IReactChildren): ReactElement => {
    return <StyledContent>{children}</StyledContent>;
};
Layout.Content = Content;

const LeftNavBar = ({ children }: IReactChildren): ReactElement => {
    return <StyledLeftNavbar>{children}</StyledLeftNavbar>;
};
Layout.LeftNavBar = LeftNavBar;

const RightNavBar = ({ children }: IReactChildren): ReactElement => {
    return <StyledRightNavbar>{children}</StyledRightNavbar>;
};
Layout.RightNavBar = RightNavBar;

export { Layout };
