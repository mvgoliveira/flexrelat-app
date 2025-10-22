"use client";

import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React from "react";

// Mock data
const mockDocuments = [
    {
        id: "1",
        publicCode: "doc-abc123",
        title: "Relatório de Vendas Q1 2025",
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
    {
        id: "3",
        publicCode: "doc-ghi789",
        title: "Análise de Mercado",
        description: "Estudo sobre tendências e oportunidades de mercado",
        createdAt: "2025-03-10",
        updatedAt: "2025-03-15",
    },
    {
        id: "4",
        publicCode: "doc-jkl012",
        title: "Relatório Financeiro Anual",
        description: "Demonstrações financeiras e análise de resultados",
        createdAt: "2024-12-20",
        updatedAt: "2025-01-05",
    },
    {
        id: "5",
        publicCode: "doc-mno345",
        title: "Proposta de Projeto",
        description: "Proposta detalhada para implementação de novo sistema",
        createdAt: "2025-03-25",
        updatedAt: "2025-04-10",
    },
];

const Container = styled.div`
    min-height: 100vh;
    background-color: ${Theme.colors.gray90};
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
    gap: 1rem;
`;

const DocumentCard = styled.div`
    background-color: ${Theme.colors.gray80};
    border: 1px solid ${Theme.colors.gray70};
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        background-color: ${Theme.colors.gray70};
        border-color: ${Theme.colors.purple40};
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
                    color="white"
                    fontWeight="bold"
                    fontSize={{
                        xs: "fs400",
                        sm: "fs400",
                        md: "fs500",
                        lg: "fs500",
                        xl: "fs500",
                        xxl: "fs500",
                    }}
                >
                    Documentos
                </Typography>
                <Typography
                    tag="p"
                    color="gray50"
                    fontSize={{
                        xs: "fs100",
                        sm: "fs100",
                        md: "fs200",
                        lg: "fs200",
                        xl: "fs200",
                        xxl: "fs200",
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
                                    color="white"
                                    fontWeight="semibold"
                                    fontSize={{
                                        xs: "fs200",
                                        sm: "fs200",
                                        md: "fs300",
                                        lg: "fs300",
                                        xl: "fs300",
                                        xxl: "fs300",
                                    }}
                                >
                                    {doc.title}
                                </Typography>
                                <Typography
                                    tag="p"
                                    color="gray50"
                                    fontSize={{
                                        xs: "fs75",
                                        sm: "fs75",
                                        md: "fs100",
                                        lg: "fs100",
                                        xl: "fs100",
                                        xxl: "fs100",
                                    }}
                                >
                                    {doc.description}
                                </Typography>
                            </DocumentInfo>
                            <Button
                                variant="primary"
                                height="40px"
                                width="120px"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDocumentClick(doc.publicCode);
                                }}
                            >
                                <Typography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                        sm: "fs75",
                                        md: "fs100",
                                        lg: "fs100",
                                        xl: "fs100",
                                        xxl: "fs100",
                                    }}
                                >
                                    Abrir
                                </Typography>
                            </Button>
                        </DocumentHeader>

                        <DocumentMeta>
                            <MetaItem>
                                <Typography
                                    tag="span"
                                    color="gray60"
                                    fontSize={{
                                        xs: "fs50",
                                        sm: "fs50",
                                        md: "fs75",
                                        lg: "fs75",
                                        xl: "fs75",
                                        xxl: "fs75",
                                    }}
                                >
                                    Criado em
                                </Typography>
                                <Typography
                                    tag="span"
                                    color="gray40"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                        sm: "fs75",
                                        md: "fs75",
                                        lg: "fs75",
                                        xl: "fs75",
                                        xxl: "fs75",
                                    }}
                                >
                                    {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                                </Typography>
                            </MetaItem>
                            <MetaItem>
                                <Typography
                                    tag="span"
                                    color="gray60"
                                    fontSize={{
                                        xs: "fs50",
                                        sm: "fs50",
                                        md: "fs75",
                                        lg: "fs75",
                                        xl: "fs75",
                                        xxl: "fs75",
                                    }}
                                >
                                    Atualizado em
                                </Typography>
                                <Typography
                                    tag="span"
                                    color="gray40"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                        sm: "fs75",
                                        md: "fs75",
                                        lg: "fs75",
                                        xl: "fs75",
                                        xxl: "fs75",
                                    }}
                                >
                                    {new Date(doc.updatedAt).toLocaleDateString("pt-BR")}
                                </Typography>
                            </MetaItem>
                            <MetaItem>
                                <Typography
                                    tag="span"
                                    color="gray60"
                                    fontSize={{
                                        xs: "fs50",
                                        sm: "fs50",
                                        md: "fs75",
                                        lg: "fs75",
                                        xl: "fs75",
                                        xxl: "fs75",
                                    }}
                                >
                                    Código
                                </Typography>
                                <Typography
                                    tag="span"
                                    color="purple40"
                                    fontWeight="medium"
                                    fontSize={{
                                        xs: "fs75",
                                        sm: "fs75",
                                        md: "fs75",
                                        lg: "fs75",
                                        xl: "fs75",
                                        xxl: "fs75",
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
