"use client";

import { SearchInput } from "@/components/features/searchInput";
import { Typography } from "@/components/features/typography";
import { ProfileSelector } from "@/components/layouts/common/profileSelector";
import { Layout } from "@/components/layouts/models/layout";
import { ModelsList } from "@/components/layouts/models/modelsList";
import withSession from "@/hoc/withSession";
import { Theme } from "@/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuFileText, LuTextSelect } from "react-icons/lu";

function DocumentsPage(): React.ReactElement {
    const router = useRouter();

    const [createIsLoading, setCreateIsLoading] = useState<boolean>(false);

    const handleModelClick = (publicCode: string): void => {
        router.push(`/models/${publicCode}`);
    };

    useEffect(() => {
        return () => {
            setCreateIsLoading(false);
        };
    }, []);

    return (
        <Layout>
            <Layout.NavBar>
                <Layout.NavBar.Item
                    icon={<LuFileText size={14} color={Theme.colors.gray70} />}
                    text="Documentos"
                    onClick={() => router.push("/documents")}
                />

                <Layout.NavBar.Item
                    active
                    icon={<LuTextSelect size={14} color={Theme.colors.black} />}
                    text="Modelos"
                />
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
                        <LuTextSelect size={16} color={Theme.colors.black} />

                        <Typography
                            tag="h1"
                            fontSize={{ xs: "fs100" }}
                            color="black"
                            fontWeight="medium"
                        >
                            Modelos
                        </Typography>
                    </div>

                    <div style={{ display: "flex", gap: 10, height: 30 }}>
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
                    <ModelsList onModelClick={handleModelClick} />
                </Layout.Content.Container>
            </Layout.Content>
        </Layout>
    );
}

export default withSession(DocumentsPage);
