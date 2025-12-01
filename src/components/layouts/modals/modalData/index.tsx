import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modal";
import { Theme } from "@/themes";
import ReactCodeMirror from "@uiw/react-codemirror";
import _ from "lodash";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TbDatabase } from "react-icons/tb";

import { ModalSendData } from "../modalSendData";
import { DataItem } from "./components/dataItem";
import { CUSTOM_THEME } from "./editorTheme";
import {
    ChartContainer,
    ConfigurationContainer,
    ConfigurationContent,
    Divider,
    TopContainer,
} from "./styles";

interface IModalDataProps {
    isOpen: boolean;
    close: () => void;
}

export const ModalData = ({ isOpen, close }: IModalDataProps): ReactElement => {
    const [isModalSendDataOpen, setIsModalSendDataOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [activeId, setActiveId] = useState<string>("");

    const handleChangeActiveId = (id: string) => {
        if (activeId === id) setActiveId("");
        else setActiveId(id);
    };

    const handleUpdate = async (newData: string) => {
        try {
            // do something
            console.log(newData);
        } catch (error) {}
    };

    const saveChange = useMemo(
        () =>
            _.debounce(async (data: string) => {
                if (data) handleUpdate(data);
            }, 1000),

        []
    );

    const onChange = useCallback(
        (val: string) => {
            setValue(val);
            saveChange(val);
        },
        [saveChange]
    );

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={close}
                title="Dados"
                icon={<TbDatabase size={12} color={Theme.colors.gray100} />}
            >
                <TopContainer>
                    <ConfigurationContainer>
                        <Button
                            height="35px"
                            width="100%"
                            onClick={() => setIsModalSendDataOpen(true)}
                            hasShadow
                        >
                            <MdAddCircle size={12} color={Theme.colors.white} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="white"
                                fontWeight="regular"
                                textAlign="left"
                            >
                                Adicionar Novo Dado
                            </Typography>
                        </Button>

                        <Divider />

                        <ConfigurationContent>
                            <DataItem
                                type="pdf"
                                name="Resumo fiscal 2023.pdf"
                                id="1"
                                activeId={activeId}
                                onClick={() => handleChangeActiveId("1")}
                            />
                        </ConfigurationContent>
                    </ConfigurationContainer>

                    <ChartContainer>
                        {activeId && (
                            <ReactCodeMirror
                                value={value}
                                theme={CUSTOM_THEME}
                                height="100%"
                                extensions={[]}
                                onChange={onChange}
                            />
                        )}
                    </ChartContainer>
                </TopContainer>
            </Modal>

            <ModalSendData
                open={isModalSendDataOpen}
                setOpen={setIsModalSendDataOpen}
                onSendData={() => {}}
            />
        </>
    );
};
