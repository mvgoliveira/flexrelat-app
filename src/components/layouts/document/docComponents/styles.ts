import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;
