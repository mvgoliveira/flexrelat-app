"use client";

import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React from "react";

const mockDocuments = [
    {
        id: "1",
        publicCode: "SKXERH0C",
        title: "Relatório sem título",
        description: "Análise completa das vendas do primeiro trimestre",
        createdAt: "2025-01-15",
        updatedAt: "2025-03-20",
    },
    {
        id: "2",
        publicCode: "doc-def456",
        title: "Planejamento Estratégico 2025",
        description: "Plano estratégico para o ano de 2025",
        createdAt: "2025-02-01",
        updatedAt: "2025-02-28",
    },
];

const Container = styled.div`
    min-height: 100vh;
    background-color: ${Theme.colors.gray10};
    padding: 2rem;
`;

const Header = styled.div`
    max-width: 1200px;
    margin: 0 auto 2rem;
`;

const DocumentsList = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 10px;
`;

const DocumentCard = styled.div`
    background-color: ${Theme.colors.white};
    border: 1px solid ${Theme.colors.gray40};
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        background-color: ${Theme.colors.gray20};
        border-color: ${Theme.colors.gray70};
        transform: translateY(-2px);
    }
`;

const DocumentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const DocumentInfo = styled.div`
    flex: 1;
`;

const DocumentMeta = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 0.75rem;
`;

const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export default function DocumentsPage(): React.ReactElement {
    const router = useRouter();

    const handleDocumentClick = (publicCode: string): void => {
        router.push(`/documents/${publicCode}`);
    };

    return (
        <Container>
            <Header>
                <Typography
                    tag="h1"
                    color="black"
                    fontWeight="bold"
                    fontSize={{
                        xs: "fs300",
                    }}
                >
                    Documentos
                </Typography>
                <Typography
                    tag="p"
                    color="gray80"
                    fontSize={{
                        xs: "fs100",
                    }}
                >
                    Gerencie e acesse seus documentos
                </Typography>
            </Header>

            <DocumentsList>
                {mockDocuments.map(doc => (
                    <DocumentCard key={doc.id} onClick={() => handleDocumentClick(doc.publicCode)}>
                        <DocumentHeader>
                            <DocumentInfo>
                                <Typography
                                    tag="h3"
                                    color="black"
                                    fontWeight="semibold"
                                    fontSize={{
                                        xs: "fs100",
                                    }}
                                >
                                    {doc.title}
                                </Typography>

                                <Typography
                                    tag="p"
                                    color="gray70"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    {doc.description}
                                </Typography>
                            </DocumentInfo>
                        </DocumentHeader>

                        <DocumentMeta>
                            <MetaItem>
                                <Typography
                                    tag="span"
                                    color="gray80"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    Criado em
                                </Typography>

                                <Typography
                                    tag="span"
                                    color="gray80"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                                </Typography>
                            </MetaItem>

                            <MetaItem>
                                <Typography
                                    tag="span"
                                    color="gray80"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    Atualizado em
                                </Typography>

                                <Typography
                                    tag="span"
                                    color="gray80"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    {new Date(doc.updatedAt).toLocaleDateString("pt-BR")}
                                </Typography>
                            </MetaItem>

                            <MetaItem>
                                <Typography
                                    tag="span"
                                    color="gray80"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    Código
                                </Typography>

                                <Typography
                                    tag="span"
                                    color="gray80"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                    }}
                                >
                                    {doc.publicCode}
                                </Typography>
                            </MetaItem>
                        </DocumentMeta>
                    </DocumentCard>
                ))}
            </DocumentsList>
        </Container>
    );
}
