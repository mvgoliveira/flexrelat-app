"use client";

import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { SearchInput } from "@/components/features/searchInput";
import { Typography } from "@/components/features/typography";
import { ProfileSelector } from "@/components/layouts/common/profileSelector";
import { DocumentsList } from "@/components/layouts/documents/documentsList";
import { Layout } from "@/components/layouts/documents/layout";
import withSession from "@/hoc/withSession";
import { createDocument } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { MdAdd } from "react-icons/md";

function DocumentsPage(): React.ReactElement {
    const router = useRouter();

    const [createIsLoading, setCreateIsLoading] = useState<boolean>(false);

    const handleDocumentClick = (publicCode: string): void => {
        router.push(`/documents/${publicCode}`);
    };

    const handleCreateDocument = async () => {
        setCreateIsLoading(true);
        const document = await createDocument();
        router.push(`/documents/${document.publicCode}`);
        setCreateIsLoading(false);
    };

    useEffect(() => {
        return () => {
            setCreateIsLoading(false);
        };
    }, []);

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
                        <CgFileDocument size={14} color={Theme.colors.black} />

                        <Typography
                            tag="h1"
                            fontSize={{ xs: "fs100" }}
                            color="black"
                            fontWeight="medium"
                        >
                            Documentos
                        </Typography>
                    </div>

                    <div style={{ display: "flex", gap: 10, height: 30 }}>
                        <Button
                            height="30px"
                            width="100px"
                            onClick={handleCreateDocument}
                            disabled={createIsLoading}
                            hasShadow
                        >
                            {createIsLoading ? (
                                <div style={{ transform: "scale(0.6)" }}>
                                    <Spinner />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                    }}
                                >
                                    <MdAdd size={12} color={Theme.colors.white} />
                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="white"
                                        fontWeight="regular"
                                        textAlign="center"
                                    >
                                        Novo
                                    </Typography>
                                </div>
                            )}
                        </Button>

                        <div style={{ width: 200 }}>
                            <SearchInput hasShadow />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                height: "100%",
                                width: 1,
                                background: Theme.colors.gray30,
                                margin: "0 5px",
                            }}
                        ></div>

                        <ProfileSelector />
                    </div>
                </Layout.Content.Header>

                <Layout.Content.Container>
                    <DocumentsList onDocumentClick={handleDocumentClick} />
                </Layout.Content.Container>
            </Layout.Content>
        </Layout>
    );
}

export default withSession(DocumentsPage);
