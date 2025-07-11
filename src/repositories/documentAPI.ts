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
            <h1 data-id="62e714dae9">Você já conferiu nossas tabelas? Elas são impressionantes!</h1>
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
