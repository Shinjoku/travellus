import styled from "styled-components";

export const Container = styled.dialog`
  width: 85%;
  max-width: 600px;
  border: none;
  border-radius: 1rem;
  padding-block: 1.5rem;
  padding-inline: 0.5rem;

  &::backdrop {
    background: #000000a1;
  }

  .close-btn > svg {
    transform-origin: center;
    transition: transform 0.4s;

    &:hover {
      transform: rotate(180deg);
    }
  }

  @media screen and (min-width: 600px) {
    padding-inline: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 0.5rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;

  @media screen and (min-width: 720px) {
    font-size: 1.75rem;
  }
`;
