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
            <p/>
            <p>
                <strong>
                    Tabelas e Listas funcionais
                </strong>
            </p>
            <ul data-id="62e714dae1">
                <li>Tabelas com linhas, células e cabeçalhos (opcional).</li>
                <li>Suporte para <code>colgroup</code> e <code>rowspan</code>.</li>
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

            <chart-node>
                <div class="VictoryContainer" style="height:100%;width:100%;user-select:none;pointer-events:none;touch-action:none;position:relative"><svg width="450" height="300" role="img" viewBox="0 0 450 300" style="width:100%;height:100%;pointer-events:all"><g style="height:100%;width:100%;user-select:none" clip-path="url(#undefined)"><defs><clipPath><rect vector-effect="non-scaling-stroke" x="60" y="60" width="330" height="180"></rect></clipPath></defs><path d="M60,240L87.5,219.376L115,204.504L142.5,179.081L170,149.003L197.5,124.851L225,112.791L252.5,108.39L280,99.397L307.5,89.911L335,86.511L362.5,75.76L390,60" style="fill:transparent;stroke:#2D7FF9;pointer-events:stroke;opacity:1;stroke-width:2;stroke-linecap:round;stroke-linejoin:round" role="presentation" shape-rendering="auto"></path></g><g role="presentation"><line vector-effect="non-scaling-stroke" style="stroke:#757575;fill:transparent;stroke-width:1;stroke-linecap:round;stroke-linejoin:round" role="presentation" shape-rendering="auto" x1="60" x2="390" y1="240" y2="240"></line><g role="presentation"><text id="chart-axis-1-tickLabels-0" direction="inherit" dx="0" x="60" y="263.26"><tspan x="60" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,010</tspan></text></g><g role="presentation"><text id="chart-axis-1-tickLabels-1" direction="inherit" dx="0" x="115" y="263.26"><tspan x="115" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,012</tspan></text></g><g role="presentation"><text id="chart-axis-1-tickLabels-2" direction="inherit" dx="0" x="170" y="263.26"><tspan x="170" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,014</tspan></text></g><g role="presentation"><text id="chart-axis-1-tickLabels-3" direction="inherit" dx="0" x="225" y="263.26"><tspan x="225" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,016</tspan></text></g><g role="presentation"><text id="chart-axis-1-tickLabels-4" direction="inherit" dx="0" x="280" y="263.26"><tspan x="280" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,018</tspan></text></g><g role="presentation"><text id="chart-axis-1-tickLabels-5" direction="inherit" dx="0" x="335" y="263.26"><tspan x="335" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,020</tspan></text></g><g role="presentation"><text id="chart-axis-1-tickLabels-6" direction="inherit" dx="0" x="390" y="263.26"><tspan x="390" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">2,022</tspan></text></g></g><g role="presentation"><line vector-effect="non-scaling-stroke" style="stroke:#757575;fill:transparent;stroke-width:1;stroke-linecap:round;stroke-linejoin:round" role="presentation" shape-rendering="auto" x1="60" x2="60" y1="60" y2="240"></line><g role="presentation"><text id="chart-axis-2-tickLabels-0" direction="inherit" dx="0" x="47" y="243.7356601002671"><tspan x="47" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">4</tspan></text></g><g role="presentation"><text id="chart-axis-2-tickLabels-1" direction="inherit" dx="0" x="47" y="211.95729176270794"><tspan x="47" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">6</tspan></text></g><g role="presentation"><text id="chart-axis-2-tickLabels-2" direction="inherit" dx="0" x="47" y="180.1789234251488"><tspan x="47" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">8</tspan></text></g><g role="presentation"><text id="chart-axis-2-tickLabels-3" direction="inherit" dx="0" x="47" y="148.40055508758965"><tspan x="47" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">10</tspan></text></g><g role="presentation"><text id="chart-axis-2-tickLabels-4" direction="inherit" dx="0" x="47" y="116.62218675003051"><tspan x="47" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">12</tspan></text></g><g role="presentation"><text id="chart-axis-2-tickLabels-5" direction="inherit" dx="0" x="47" y="84.84381841247135"><tspan x="47" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Inter&#x27;, &#x27;Helvetica Neue&#x27;, &#x27;Seravek&#x27;, &#x27;Helvetica&#x27;, sans-serif;font-size:12px;font-weight:300;letter-spacing:normal;padding:8px;fill:#292929;stroke:transparent">14</tspan></text></g></g></svg><div style="width:100%;height:100%;z-index:99;position:absolute;top:0;left:0"><svg width="450" height="300" viewBox="0 0 450 300" style="width:100%;height:100%;overflow:visible"></svg></div></div>
            </chart-node>
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
