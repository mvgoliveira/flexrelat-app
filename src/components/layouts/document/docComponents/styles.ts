import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    gap: 20px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const GroupLabelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

export const GroupContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const ArrowButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

export const ElementContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;
