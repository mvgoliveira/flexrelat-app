import { LeftTabsValue, LeftTabType } from "@/app/dashboard/page";
import { Typography } from "@/components/features/typography";
import { IReactChildren } from "@/types/core";
import { Dispatch, ReactElement, SetStateAction } from "react";

import {
    Root,
    StyledContent,
    StyledHeader,
    StyledLeftNavbar,
    NavbarHeader,
    NavHeaderItem,
    StyledRightNavbar,
    NavHeaderContainer,
} from "./styles";

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

interface ILeftNavBarProps {
    headerItens: LeftTabType[];
    activeTab: LeftTabsValue;
    setActiveLeftTab: Dispatch<SetStateAction<LeftTabsValue>>;
}

const LeftNavBar = ({
    children,
    headerItens,
    activeTab,
    setActiveLeftTab,
}: ILeftNavBarProps & IReactChildren): ReactElement => {
    return (
        <StyledLeftNavbar>
            <NavbarHeader>
                <NavHeaderContainer>
                    {headerItens?.map((item, index) => (
                        <NavHeaderItem
                            key={index}
                            active={activeTab === item.value}
                            onClick={() => setActiveLeftTab(item.value)}
                        >
                            {item.icon}

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color={activeTab === item.value ? "black" : "gray70"}
                                fontWeight="medium"
                            >
                                {item.text}
                            </Typography>
                        </NavHeaderItem>
                    ))}
                </NavHeaderContainer>
            </NavbarHeader>

            {children}
        </StyledLeftNavbar>
    );
};
Layout.LeftNavBar = LeftNavBar;

const RightNavBar = ({ children }: IReactChildren): ReactElement => {
    return <StyledRightNavbar>{children}</StyledRightNavbar>;
};
Layout.RightNavBar = RightNavBar;

export { Layout };
