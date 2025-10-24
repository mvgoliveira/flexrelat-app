"use client";

import { SearchInput } from "@/components/features/searchInput";
import { Typography } from "@/components/features/typography";
import { DocumentsList } from "@/components/layouts/documents/documentsList";
import { Layout } from "@/components/layouts/documents/layout";
import { Theme } from "@/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { CgFileDocument } from "react-icons/cg";

export default function DocumentsPage(): React.ReactElement {
    const router = useRouter();

    const handleDocumentClick = (publicCode: string): void => {
        router.push(`/documents/${publicCode}`);
    };

    return (
        <Layout>
            <Layout.NavBar>
                <></>
            </Layout.NavBar>

            <Layout.Content>
                <Layout.Content.Header>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CgFileDocument size={18} color={Theme.colors.black} />

                        <Typography
                            tag="h1"
                            fontSize={{ xs: "fs150" }}
                            color="black"
                            fontWeight="medium"
                        >
                            Documentos
                        </Typography>
                    </div>

                    <div style={{ height: 30 }}>
                        <SearchInput />
                    </div>
                </Layout.Content.Header>

                <Layout.Content.Container>
                    <DocumentsList onDocumentClick={handleDocumentClick} />
                </Layout.Content.Container>
            </Layout.Content>
        </Layout>
    );
}
