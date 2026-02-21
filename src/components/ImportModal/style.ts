import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block: 1rem;
  gap: 1rem;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;
