import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { ModalData } from "@/components/layouts/modals/modalData";
import { Tooltip } from "@/components/ui/tooltip";
import { updateModelTitle } from "@/repositories/modelAPI";
import { Theme } from "@/themes";
import { getFormattedDate } from "@/utils/date";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import {
    MdArrowBack,
    MdMoreHoriz,
    MdOutlineCloudDone,
    MdOutlineCloudOff,
    MdOutlineCloudUpload,
} from "react-icons/md";
import { TbDatabase } from "react-icons/tb";

import { ButtonsContainer, RightContainer, Root, TitleContainer, TitleContent } from "./styles";

interface IHeaderProps {
    metadata: {
        id: string;
        title: string;
        createdAt: string;
        saveStatus: "pending" | "success" | "error";
        onChangeStatus: (status: "pending" | "success" | "error") => void;
    };
}

export const Header = ({ metadata }: IHeaderProps): ReactElement => {
    const router = useRouter();

    const titleRef = useRef<HTMLHeadingElement>(null);

    const [title, setTitle] = useState<string>(metadata.title);
    const [isDataModalOpen, setIsDataModalOpen] = useState<boolean>(false);

    const saveTitle = useMemo(
        () =>
            _.debounce(async (newTitle: string) => {
                try {
                    metadata.onChangeStatus("pending");
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    if (newTitle === title) {
                        return;
                    }

                    const response = await updateModelTitle(metadata.id, newTitle);

                    metadata.onChangeStatus("success");

                    if (titleRef && titleRef.current && newTitle !== "Relatório sem título") {
                        titleRef.current.textContent = response.name;
                        titleRef.current.style.color = Theme.colors.gray100;
                        setTitle(response.name);
                    } else if (newTitle === "Relatório sem título") {
                        setTitle("");
                    }
                } catch (error) {
                    if (titleRef) {
                        if (titleRef.current) {
                            titleRef.current.textContent = title;
                        }
                    }

                    metadata.onChangeStatus("error");
                }
            }, 500),
        [metadata, title]
    );

    const handleBlurTitle = async () => {
        if (titleRef.current && titleRef.current.textContent !== title) {
            if (!titleRef.current.textContent) {
                titleRef.current!.style.color = Theme.colors.gray70;
                titleRef.current!.textContent = "Relatório sem título";
            }

            saveTitle(titleRef.current.textContent || "");
        }

        if (titleRef.current && titleRef.current.textContent === "" && title === "") {
            titleRef.current.style.color = Theme.colors.gray70;
            titleRef.current.textContent = "Relatório sem título";
        }
    };

    const handleChangeTitle = async () => {
        if (titleRef.current && titleRef.current.textContent !== "Relatório sem título") {
            titleRef.current.style.color = Theme.colors.gray100;
        }
    };

    const handleClickTitle = () => {
        if (titleRef.current && titleRef.current.textContent === "Relatório sem título") {
            titleRef.current.textContent = "";
        }
    };

    const handleBackToModels = (): void => {
        router.push(`/models`);
    };

    useEffect(() => {
        if (metadata.title) {
            setTitle(metadata.title);
        }

        return () => {
            setTitle("");
            setTitle("");
        };
    }, [metadata.title]);

    return (
        <Root>
            <ModalData isOpen={isDataModalOpen} close={() => setIsDataModalOpen(false)} />

            <TitleContainer>
                <Button width="25px" height="25px" variant="secondary" onClick={handleBackToModels}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MdArrowBack size={12} color={Theme.colors.gray90} />
                    </div>
                </Button>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <TitleContent hasTitle={title !== ""}>
                            <Typography
                                tag="h1"
                                fontSize={{ xs: "fs75" }}
                                color="black"
                                fontWeight="medium"
                                textAlign="left"
                                contentEditable={
                                    metadata.saveStatus !== "pending" ? "plaintext-only" : false
                                }
                                onBlur={handleBlurTitle}
                                onChange={handleChangeTitle}
                                onClick={handleClickTitle}
                                ref={titleRef}
                            >
                                {title === "" ? "Relatório sem título" : title}
                            </Typography>
                        </TitleContent>

                        {metadata.saveStatus === "success" && (
                            <Tooltip>
                                <Tooltip.Trigger>
                                    <MdOutlineCloudDone size={12} color={Theme.colors.black} />
                                </Tooltip.Trigger>
                                <Tooltip.Content>Todas as alterações foram salvas</Tooltip.Content>
                            </Tooltip>
                        )}

                        {metadata.saveStatus === "pending" && (
                            <Tooltip>
                                <Tooltip.Trigger>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <MdOutlineCloudUpload
                                            size={12}
                                            color={Theme.colors.black}
                                        />

                                        <Typography
                                            tag="p"
                                            fontSize={{ xs: "fs50" }}
                                            color="black"
                                            fontWeight="medium"
                                            textAlign="left"
                                        >
                                            Salvando...
                                        </Typography>
                                    </div>
                                </Tooltip.Trigger>
                                <Tooltip.Content>Salvando alterações...</Tooltip.Content>
                            </Tooltip>
                        )}

                        {metadata.saveStatus === "error" && (
                            <Tooltip>
                                <Tooltip.Trigger>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                        }}
                                    >
                                        <MdOutlineCloudOff size={12} color={Theme.colors.red70} />
                                    </div>
                                </Tooltip.Trigger>
                                <Tooltip.Content>Erro ao salvar as alterações</Tooltip.Content>
                            </Tooltip>
                        )}
                    </div>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="gray70"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Criado em {getFormattedDate(metadata.createdAt)}
                    </Typography>
                </div>
            </TitleContainer>

            <RightContainer>
                <ButtonsContainer>
                    <Button
                        height="30px"
                        variant="secondary"
                        padding="0 10px"
                        onClick={() => setIsDataModalOpen(true)}
                    >
                        <TbDatabase size={12} color={Theme.colors.gray100} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray100"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Dados
                        </Typography>
                    </Button>

                    {/* <Button height="30px" variant="secondary" padding="0 10px">
                        <MdOutlineAutoMode size={12} color={Theme.colors.gray100} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray100"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Automações
                        </Typography>
                    </Button> */}

                    {/* <Button height="30px" variant="secondary" padding="0 10px">
                        <MdHistory size={13} color={Theme.colors.gray100} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray100"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Histórico
                        </Typography>
                    </Button> */}
                </ButtonsContainer>

                <ButtonsContainer>
                    <Button height="30px" width="30px" variant="tertiary">
                        <MdMoreHoriz size={16} color={Theme.colors.gray100} />
                    </Button>
                </ButtonsContainer>
            </RightContainer>
        </Root>
    );
};
