import styled from "styled-components";

import Input from "../Input";

export const Dialog = styled.dialog`
  width: 85%;
  max-width: 500px;
  border: none;
  border-radius: 1rem;
  padding: 1.5rem 1rem;

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

  .submit-btn {
    margin-inline: auto;
  }
`;

export const ActivityForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  width: 100%;

  ${Input} {
    width: 200px;
    height: 28px;
    font-size: medium;
    margin-inline: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.5rem;
`;

export const Select = styled.select`
  width: 200px;
  height: 28px;
  font-size: medium;
  margin-inline: auto;
`;
