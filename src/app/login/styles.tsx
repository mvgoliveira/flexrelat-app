import styled from "@emotion/styled";

export const Container = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.gray10};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
`;

export const LoginBox = styled.div`
    display: flex;
    width: fit-content;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray10};
    padding: 40px 20px;
    min-height: fit-content;
    gap: 20px;
    max-width: fit-content;

    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid ${({ theme }) => theme.colors.gray40};
    padding-right: 40px;
    padding-left: 20px;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    max-width: 50px;
    background: ${({ theme }) => theme.colors.black};
    border-radius: 50%;
    margin-bottom: 20px;
`;

export const FormContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #d1d5db;
    margin-bottom: 0.5rem;
`;

export const InputContainer = styled.div`
    position: relative;
`;

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const Footer = styled.div`
    text-align: center;
    color: #6b7280;
    margin-top: 20px;

    p {
        margin: 0;
    }
`;
