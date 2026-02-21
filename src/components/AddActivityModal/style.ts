import styled from "styled-components";

import Input from "../Input";

export const ActivityForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .submit-btn {
    margin-inline: auto;
  }
`;

export const Label = styled.label`
  ${Input}, select {
    display: block;
    width: 200px;
    height: 28px;
    font-size: medium;
    margin-inline: auto;
  }
`;
