import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { jspreadsheet, Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import { ReactElement, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

import { Container, Header, Root } from "./styles";

interface IDataSetProps {
    name: string;
    data: Array<Array<string | number>>;
    changeData: (data: Array<Array<string | number>>) => void;
}

export const DataSet = ({ name, data, changeData }: IDataSetProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const spreadsheet = useRef(null);

    const contextMenu = () => {
        return false;
    };

    const columns = [
        {
            type: "text",
            title: "X",
            tooltip: "Eixo-x do gráfico",
        },
        {
            type: "text",
            title: "Y",
            tooltip: "Eixo-y do gráfico",
        },
    ];

    jspreadsheet.setDictionary({
        "Rename this worksheet": "Renomear worksheet",
        "Delete this worksheet": "Apagar worksheet",
        "Are you sure?": "Tem certeza?",
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
        changeData(filteredNewData);
    };

    return (
        <Root>
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

            <Container isOpen={isOpen}>
                <Spreadsheet
                    key="dataSet"
                    ref={spreadsheet}
                    contextMenu={contextMenu}
                    onchange={handleChangeData}
                >
                    <Worksheet minDimensions={[2, 20]} columns={columns} data={data} />
                </Spreadsheet>
            </Container>
        </Root>
    );
};
