export type DocumentData = {
    id: string;
    user_id: string;
    name: string;
    is_public: boolean;
    public_code: string;
    content: string;
    created_at: string;
    updated_at: string;
};

export const getDocumentByDocumentId = async (documentId: string): Promise<DocumentData> => {
    const chartData = {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Data 1",
                    showLine: true,
                    lineTension: 0,
                    borderWidth: 2,
                    fill: false,
                    borderColor: "blue",
                    data: [
                        {
                            x: 20,
                            y: 75,
                        },
                        {
                            x: 30,
                            y: -53,
                        },
                        {
                            x: 40,
                            y: 31,
                        },
                        {
                            x: 50,
                            y: 6,
                        },
                    ],
                },
                {
                    label: "Data 2",
                    showLine: true,
                    lineTension: 0,
                    borderWidth: 2,
                    fill: false,
                    borderColor: "red",
                    data: [
                        {
                            x: 20,
                            y: -59,
                        },
                        {
                            x: 60,
                            y: -68,
                        },
                        {
                            x: 65,
                            y: -43,
                        },
                        {
                            x: 75,
                            y: 9,
                        },
                    ],
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: "Gráfico de qualquer coisa",
            },
            legend: {
                position: "top",
                labels: {
                    usePointStyle: false,
                    boxWidth: 13,
                },
            },
            scales: {
                xAxes: [
                    {
                        type: "linear",
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Eixo X",
                        },
                        ticks: {
                            major: {
                                enabled: false,
                            },
                        },
                    },
                ],
                yAxes: [
                    {
                        type: "linear",
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Eixo Y",
                        },
                        ticks: {
                            major: {
                                enabled: false,
                            },
                        },
                    },
                ],
            },
        },
    };

    return {
        id: documentId,
        user_id: "user123",
        name: "",
        is_public: false,
        public_code: "ABCD1234",
        content: `
            <h4 data-id="62e714dae9" style="text-align: center"><span style="font-size: 18pt">Resumo</span></h4>

            <p/>
            
            <p style="text-align: justify">
                A aumento necessidade de agilidade e precisão na execução de atividades complexas e repetitivas tem impulsionado o uso de tecnologias baseadas em Inteligência Artificial Generativa no cotidiano corporativo e institucional. Processos tradicionalmente onerosos, como a elaboração manual de relatórios detalhados, frequentemente enfrentam desafios significativos, incluindo a ocorrência de erros grosseiros, atrasos frequentes na entrega e a demanda por um elevado nível de conhecimento técnico especializado. Além disso, a variabilidade na qualidade dos documentos produzidos pode comprometer a tomada de decisões estratégicas e operacionais. Diante desse contexto, torna-se evidente a demanda por soluções tecnológicas que simplifiquem e agilizem esses processos. Propõe-se, portanto, a plataforma web FlexRelat, uma abordagem baseada em Inteligência Artificial Generativa (GenAI), que utiliza Modelos de Linguagem de Larga Escala (LLM) para gerar relatórios personalizados a partir de entradas em linguagem natural, exigindo o mínimo de conhecimento técnico por parte do usuário. Espera-se que a plataforma contribua significativamente para a redução de custos operacionais, aumento da produtividade e melhoria na qualidade dos relatórios produzidos, promovendo maior eficiência em setores como negócios, educação e saúde.
            <p/>

            <p/>
            <p/>

            <p>
                <strong>Palavras-chave:</strong> Inteligência Artificial Generativa; Relatórios inteligentes; Geração de relatórios; Plataforma Web; Aplicações com IA; Assistente virtual;    
            </p>
            
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>

            <p>
                <strong>
                    1. Tabelas e Listas funcionais
                </strong>
            </p>
            <ul data-id="62e714dae1">
                <li>Tabelas com linhas, células e cabeçalhos (opcional).</li>
                <li>Suporte para colgroup e rowspan.</li>
                <li>E até mesmo colunas redimensionáveis (opcional).</li>
            </ul>
            <p>
                <span data-decoration-id="id_1428080181" class="expression-active">
                Aqui está um exemplo:
                </span>
                </p>
                <table>
                <tbody>
                    <tr>
                    <th colwidth="200">Nome</th>
                    <th colspan="3" colwidth="150,100">Descrição</th>
                    </tr>
                    <tr>
                    <td>Cyndi Lauper</td>
                    <td>Cantora</td>
                    <td>Compositora</td>
                    <td>Atriz</td>
                    </tr>
                    <tr>
                    <td>Marie Curie</td>
                    <td>Cientista</td>
                    <td>Química</td>
                    <td>Física</td>
                    </tr>
                    <tr>
                    <td>Indira Gandhi</td>
                    <td>Primeira-ministra</td>
                    <td colspan="2">Política</td>
                    </tr>
                    </tbody>
            </table>
            
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>

            <p>
                <strong>
                    2. Gráficos
                </strong>
            </p>
            
            <quick-chart
                chart-data=${encodeURIComponent(JSON.stringify(chartData))}
            ></quick-chart>

            <p style="text-align: center">
                Figura 1. Gráfico de qualquer coisa
            </p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
};

interface IUpdateDocumentTitleResponse {
    id: string;
    title: string;
}

export const updateDocumentTitle = async (
    documentId: string,
    title: string
): Promise<IUpdateDocumentTitleResponse> => {
    return {
        id: documentId,
        title: title,
    };
};

export const updateDocumentContent = async (
    documentId: string,
    content: string
): Promise<{ id: string; content: string }> => {
    console.log("[TEST] Updating document content");

    return {
        id: documentId,
        content: content,
    };
};
