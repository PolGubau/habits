import styled from "styled-components";

export const ExpensesPageStyle = styled.main`
  display: flex;
  padding: 0 20px;
  width: 100%;

  .editAction {
    cursor: pointer;
    :hover {
      color: blue;
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
    }
  }
  .deleteAction {
    cursor: pointer;
    :hover {
      color: red;
      background-color: #ffebea;
      border: 1px solid #ffa39e;
    }
  }
`;
