import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

import {
    Root,
    SecondaryRoot,
    StyledContainer,
    StyledContent,
    StyledHeader,
    StyledNavbar,
    StyledNavbarItem,
} from "./styles";

const SecondaryLayout = ({ children }: IReactChildren): ReactElement => {
    return <SecondaryRoot>{children}</SecondaryRoot>;
};

const Layout = ({ children }: IReactChildren): ReactElement => {
    return <Root>{children}</Root>;
};

const NavBar = ({ children }: IReactChildren): ReactElement => {
    return (
        <StyledNavbar className="no-print">
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: 50,
                    borderBottom: `1px solid ${Theme.colors.gray40}`,
                }}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    padding: "10px",
                    gap: "5px",
                }}
            >
                {children}
            </div>
        </StyledNavbar>
    );
};
Layout.NavBar = NavBar;

interface IItemProps {
    icon: ReactElement;
    text: string;
    active?: boolean;
    onClick?: () => void;
}

const Item = ({ icon, text, active = false, onClick }: IItemProps): ReactElement => {
    return (
        <StyledNavbarItem onClick={onClick}>
            {icon}

            <Typography
                tag="p"
                fontSize={{ xs: "fs75" }}
                color={active ? "black" : "gray70"}
                fontWeight="medium"
            >
                {text}
            </Typography>
        </StyledNavbarItem>
    );
};
NavBar.Item = Item;

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
