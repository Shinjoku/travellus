import styled from "styled-components";

interface DialogButtonProps {
  command?: string;
  commandfor?: string;
}

interface ButtonProps {
  icon?: boolean;
}

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "icon",
})<ButtonProps & DialogButtonProps>`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: solid 1px transparent;
  font-family: inherit;
  transition: border-color 0.25s;

  background-color: ${(props) => (props.icon ? "transparent" : "#1a1a1a")};
  font-size: ${(props) => (props.icon ? "1.5rem" : "0.8rem")};
  padding: ${(props) => (props.icon ? ".5rem" : ".6rem 1.2rem")};

  &:hover:not(:disabled) {
    border-color: #646cff;
    cursor: pointer;
  }

  &:focus,
  &:focus-visible {
    outline: 1px solid#777777;
  }

  @media screen and (min-width: 450px) {
    font-size: ${(props) => (props.icon ? "2rem" : "1rem")};
  }
`;

export default Button;
