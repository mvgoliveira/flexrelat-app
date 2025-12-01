import styled from "@emotion/styled";
import { Upload } from "antd";
const { Dragger } = Upload;

export const StyledContent = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 25px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
`;

export const StyledDragger = styled(Dragger)`
    gap: 20px;
`;
