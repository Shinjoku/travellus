import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  padding: 1rem;

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-block: 1rem;
  }

  .no-activity {
    color: #9e9e9e;
  }
`;
