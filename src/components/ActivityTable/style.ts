import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: block;
  overflow-x: auto;
  width: 100%;

  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    margin-inline: auto;

    td,
    th {
      border: 1px solid #111;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #3e3e3e;
    }

    tr:hover {
      background-color: #1b1b1b;
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #3f3f3f;
      color: white;
    }
  }
`;

export const ActionButton = styled(Button)`
  font-size: 1.25rem;
  margin-inline: auto;
`
