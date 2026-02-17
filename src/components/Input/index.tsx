import styled from "styled-components";

const Input = styled.input`
  box-sizing: border-box;
  display: block;
  border-radius: 4px;
  padding: 0.5rem 0.25rem 0.5rem 0.5rem;
  border: none;

  &::placeholder {
    font-family: "Google Sans";
    letter-spacing: 0.4px;
  }
`;

export default Input;
