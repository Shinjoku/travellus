import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  background-color: #3e3e3e;
  padding: 12px;

  border-radius: 20px;
  box-sizing: border-box;

  display: flex;
  text-align: left;
  transition: 0.2s;
  box-shadow: 0 2px 7px #1b1b1bff;

  &.expanded {
    transform: scale(105%);
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  vertical-align: middle;

  > h3 {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const CardAction = styled.div`
  text-align: center;
  align-content: center;
`;

export const CollapseButton = styled.div`
  all: unset;
  cursor: pointer;
`;
