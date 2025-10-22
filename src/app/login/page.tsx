"use client";

import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Input } from "@/components/layouts/login/input";
import { Toast } from "@/components/ui/toast";
import { login } from "@/repositories/authAPI";
import { Theme } from "@/themes";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, ReactElement, useRef, useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { MdEmail, MdLock } from "react-icons/md";

import {
    Container,
    FieldsContainer,
    Footer,
    FormContainer,
    Header,
    IconContainer,
    LoadingContainer,
    LoginBox,
} from "./styles";

export default function LoginPage(): ReactElement {
    const router = useRouter();
    const toastErrorRef = useRef<{ publish: () => void } | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const response = await login(email, password);
            console.log(response);
            const redirectUrl = localStorage.getItem("redirectUrl");
            router.push(redirectUrl || "/");
        } catch (error) {
            if (toastErrorRef.current) toastErrorRef.current.publish();
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <Container>
            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>Ocorreu um erro.</Toast.Title>
                    <Toast.Description>Tente novamente mais tarde.</Toast.Description>
                </Toast.Content>
            </Toast>

            <LoginBox>
                <Header>
                    <IconContainer>
                        <GrDocumentText size={20} color={Theme.colors.white} />
                    </IconContainer>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs100" }}
                        color="gray90"
                        fontWeight="semibold"
                        textAlign="center"
                    >
                        FlexRelat - Relatórios Facilitados
                    </Typography>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="gray70"
                        fontWeight="regular"
                        textAlign="center"
                    >
                        Faça Login para acessar o sistema
                    </Typography>
                </Header>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: 20,
                    }}
                >
                    <FormContainer>
                        <FieldsContainer>
                            <Input>
                                <Input.Label fieldId="email">Email</Input.Label>

                                <Input.Field
                                    tag="input"
                                    height="35px"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="seu@email.com"
                                    icon={<MdEmail size={12} color={Theme.colors.gray60} />}
                                />
                            </Input>

                            <Input>
                                <Input.Label fieldId="email">Senha</Input.Label>

                                <Input.Field
                                    tag="input"
                                    height="35px"
                                    id="password"
                                    name="password"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Digite sua senha"
                                    icon={<MdLock size={12} color={Theme.colors.gray60} />}
                                    hasShowPassword
                                />
                            </Input>
                        </FieldsContainer>

                        <Button
                            height="40px"
                            onClick={handleSubmit}
                            disabled={isLoading || !email || !password}
                        >
                            {isLoading ? (
                                <LoadingContainer>
                                    <div style={{ transform: "scale(0.6)" }}>
                                        <Spinner />
                                    </div>

                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="white"
                                        fontWeight="regular"
                                        textAlign="center"
                                    >
                                        Entrando...
                                    </Typography>
                                </LoadingContainer>
                            ) : (
                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs75" }}
                                    color="white"
                                    fontWeight="regular"
                                    textAlign="center"
                                >
                                    Entrar
                                </Typography>
                            )}
                        </Button>
                    </FormContainer>

                    <Footer>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray70"
                            fontWeight="regular"
                            textAlign="center"
                        >
                            Copyright © 2025 FlexRelat. Todos os direitos reservados.
                        </Typography>
                    </Footer>
                </div>
            </LoginBox>
        </Container>
    );
}
