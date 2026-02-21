import styled from "styled-components";

interface MessageProps {
  type: "notice" | "error" | "success";
}

const getColor = (type: MessageProps["type"]) => {
  if (type === "notice") return "#6c6c6c";
  if (type === "success") return "lightgreen";
  if (type === "error") return "#fb8484";

  throw new Error(`Unknown message type "${type}"`);
};

const Message = styled.p<MessageProps>`
  display: inline-block;
  margin-inline: auto;
  padding: 0.5rem 1rem;
  border-style: solid;
  font-size: 0.85rem;
  border-width: 1px;
  color: ${(props) => getColor(props.type)};
  border-color: ${(props) => getColor(props.type)};
  border-radius: 0.5rem;
`;

export default Message;
