import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: block;
  overflow-x: auto;
  width: 100%;

  .sort-info {
    color: #828282;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;

    > .highlight {
      color: #aa8b4f;
    }
  }

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
      padding-block: 0.35rem;
      padding-inline: 0.6rem;
      text-align: left;
      background-color: #3f3f3f;
      color: white;

      span {
        display: flex;
        gap: 0.25rem;
        align-items: center;
      }
    }
  }
`;

export const ActionButton = styled(Button)`
  font-size: 1.25rem;
  margin-inline: auto;
`;

export const SortButton = styled(Button)`
  display: inline-flex;
  background: #2e2e2e;
  margin-left: 0.25rem;
  padding: 0.2rem;
  font-size: 1.1rem;
  border-radius: 50%;
  transition: transform 0.4s;
  transform-origin: center;

  &.active {
    color: #ffcb6a;
  }

  &.upside-down {
    transform: rotate(180deg);
  }
`;

export const ClearSortButton = styled.button`
  all: unset;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.5rem;
`;
