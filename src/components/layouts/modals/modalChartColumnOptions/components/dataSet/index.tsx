import { Typography } from "@/components/features/typography";
import { ModalDeleteDataset } from "@/components/layouts/modals/modalDeleteDataset";
import { Theme } from "@/themes";
import { jspreadsheet, Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import { ReactElement, useCallback, useRef, useState, type KeyboardEvent } from "react";
import { MdDeleteOutline, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

import { Container, DeleteButton, Header, Root } from "./styles";

interface IDataSetProps {
    name: string;
    data: Array<string | number>;
    axis?: "X" | "Y";
    changeData: (data: Array<string | number>) => void;
    onDelete: () => void;
    hasDelete?: boolean;
}

export const DataSet = ({
    name,
    data,
    axis = "Y",
    changeData,
    onDelete,
    hasDelete = true,
}: IDataSetProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const spreadsheet = useRef(null);
    const worksheetRef = useRef<any>(null);

    const contextMenu = () => {
        return false;
    };

    const columns = [
        {
            type: "numeric",
            title: axis,
            tooltip: "Eixo-y do gráfico",
            mask: "#.##0,00",
            decimal: ",",
            locale: "pt-BR",
        },
    ];

    jspreadsheet.setDictionary({
        "Rename this worksheet": "Renomear worksheet",
        "Delete this worksheet": "Apagar worksheet",
        "Are you sure?": "Tem certeza?",
        "Are you sure to delete the selected rows?":
            "Tem certeza que deseja apagar as linhas selecionadas?",
        "Are you sure to delete the selected columns?":
            "Tem certeza que deseja apagar as colunas selecionadas?",
        "Rename this cell": "Renomear essa celula",
        Cut: "Cortar",
        Copy: "Copy",
        Paste: "Colar",
        "Insert a new column before": "Inserir uma coluna antes",
        "Insert a new column after": "Inserior uma coluna depois",
        "Delete selected columns": "Apagar colunas selecionadas",
        "Rename this column": "Renomar essa coluna",
        "Create a new row": "Criar uma nova linha",
        "Order ascending": "Ordenar asc",
        "Order descending": "Ordenar desc",
        "Insert a new row before": "Inserir uma linha antes",
        "Insert a new row after": "Inserir uma nova linha depois",
        "Delete selected rows": "Apagar linhas selecionadas",
        "Edit notes": "Editar notas",
        "Add notes": "Adicionar notas",
        Notes: "Notas",
        "Clear notes": "Apagar notas",
        "Save as": "Salvar como",
        About: "Sobre",
    });

    const handleChangeData = (worksheet: any) => {
        const updatedData = worksheet.getData() as Array<Array<string | number>>;
        const filteredNewData = updatedData.filter(row => !row.some(cell => cell === ""));
        const formattedData = filteredNewData.map(row => {
            const cellValue = row[0];
            if (typeof cellValue === "string") {
                const numberValue = parseFloat(cellValue.replace(/\./g, "").replace(",", "."));
                return isNaN(numberValue) ? cellValue : numberValue;
            }
            return cellValue;
        });

        console.log(formattedData);

        changeData(formattedData.flat() as Array<string | number>);
    };

    const handleLoad = useCallback((worksheet: any) => {
        worksheetRef.current = worksheet;
    }, []);

    const handleKeyDownCapture = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        const ws = worksheetRef.current.worksheets[0];

        if (!ws) return;

        if (e.key === "Tab") {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const isDelete = e.key === "Delete" || e.key === "Backspace";
        if (!isDelete) return;

        if (ws.selectedRow) {
            e.preventDefault();
            e.stopPropagation();

            ws.deleteRow();
            ws.insertRow();
            return;
        }

        // Se um cabeçalho de coluna estiver selecionado
        if (ws.selectedHeader) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
    }, []);

    const handleDeleteDataset = (): void => {
        setIsDeleteModalOpen(true);
        onDelete();
    };

    return (
        <Root>
            {hasDelete && (
                <ModalDeleteDataset
                    open={isDeleteModalOpen}
                    setOpen={setIsDeleteModalOpen}
                    onConfirmDelete={handleDeleteDataset}
                    name={name}
                />
            )}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {isOpen && hasDelete && (
                    <DeleteButton isOpen={isOpen} onClick={() => setIsDeleteModalOpen(true)}>
                        <MdDeleteOutline size={12} color={Theme.colors.black} />
                    </DeleteButton>
                )}

                <Header onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="black"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        {name}
                    </Typography>

                    {isOpen ? (
                        <MdKeyboardArrowDown size={14} color={Theme.colors.gray70} />
                    ) : (
                        <MdKeyboardArrowRight
                            size={14}
                            color={Theme.colors.gray70}
                            style={{ transform: "rotate(180deg)" }}
                        />
                    )}
                </Header>
            </div>

            <Container isOpen={isOpen}>
                <div onKeyDownCapture={handleKeyDownCapture}>
                    <Spreadsheet
                        key="dataSet"
                        ref={spreadsheet}
                        contextMenu={contextMenu}
                        onchange={handleChangeData}
                        onload={handleLoad}
                    >
                        <Worksheet
                            minDimensions={[1, 20]}
                            maxDimensions={[1, 50]}
                            columns={columns}
                            data={data.map(v => [v])}
                        />
                    </Spreadsheet>
                </div>
            </Container>
        </Root>
    );
};
