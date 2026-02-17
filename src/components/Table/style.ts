import styled from "styled-components";

export const ActivityTable = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #111;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #3e3e3e;
  }

  tr:hover {
    background-color: #111;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #3f3f3f;
    color: white;
  }
`;
