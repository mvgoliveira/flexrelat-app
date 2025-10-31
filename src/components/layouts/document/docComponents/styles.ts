import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px 5px 20px 20px;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 20px;
    grid-column-gap: 10px;
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
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    width: 100%;
`;

export const ElementIconContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    background: ${({ theme }) => theme.colors.gray10};
    border: 1px solid ${({ theme }) => theme.colors.gray30};
    border-radius: 4px;
    position: relative;

    transition: border 0.2s;

    svg {
        transition: opacity 0.2s;

        &:nth-of-type(1) {
            opacity: 1;
        }
        &:nth-of-type(2) {
            opacity: 0;
            position: absolute;
        }
    }

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.blue50};

        svg {
            &:nth-of-type(1) {
                opacity: 0;
                position: absolute;
            }
            &:nth-of-type(2) {
                opacity: 1;
            }
        }
    }
`;

export const Separator = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray30};

    &:last-of-type {
        display: none;
    }
`;
