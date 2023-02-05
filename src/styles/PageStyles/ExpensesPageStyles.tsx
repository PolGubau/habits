import styled from "styled-components";

export const ExpensesPageStyle = styled.main`
  display: flex;
  padding: 0 20px;
  width: 100%;
  .deleteAction {
    cursor: pointer;
    :hover {
      color: red;
      background-color: #fff1f0;
      border: 1px solid #ffa39e;
    }
  }
`;
