import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/menu";
import { Typography } from "@/components/features/typography";
import { useUserContext } from "@/context/userContext";
import { Theme } from "@/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import { MdKeyboardArrowDown, MdLogout } from "react-icons/md";

import { ProfileImage } from "./styles";

export const ProfileSelector = (): ReactElement => {
    const router = useRouter();
    const { authenticatedUser } = useUserContext();

    const handleLogout = (): void => {
        router.push("/logout");
    };

    useEffect(() => {
        console.log("Authenticated User:", authenticatedUser);
    }, [authenticatedUser]);

    return (
        <Menu>
            <Menu.Trigger>
                <Button
                    height="31px"
                    width="fit-content"
                    variant="secondary"
                    padding="0 10px"
                    hasShadow
                >
                    <ProfileImage>
                        <Image
                            src={`https://ui-avatars.com/api/?background=random&name=${authenticatedUser?.username}&bold=true`}
                            alt="organization avatar"
                            width={20}
                            height={20}
                        />
                    </ProfileImage>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="black"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        {authenticatedUser?.username}
                    </Typography>

                    <MdKeyboardArrowDown size={12} color={Theme.colors.black} />
                </Button>
            </Menu.Trigger>

            <Menu.Content alignOffset={0}>
                <Menu.Item
                    text="Sair"
                    onClick={handleLogout}
                    iconPosition="left"
                    icon={<MdLogout size={12} color={Theme.colors.black} />}
                />
            </Menu.Content>
        </Menu>
    );
};
