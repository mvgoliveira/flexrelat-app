import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 15px;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
`;

export const EmptyState = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    height: 100%;
    height: 200px;
`;
