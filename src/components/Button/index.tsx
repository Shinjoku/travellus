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
  border-radius: 8px;
  border: solid 1px transparent;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;

  background-color: ${(props) => (props.icon ? "transparent" : "#1a1a1a")};
  font-size: ${(props) => (props.icon ? "2rem" : "1rem")};
  padding: ${(props) => (props.icon ? ".5rem" : ".6rem 1.2rem")};

  button:hover {
    border-color: #646cff;
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export default Button;
