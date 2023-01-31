import styled from "styled-components";

export const ExpensesFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  .money {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    input {
      border: 1px solid #ccc;
      padding: 4px;
    }
    select {
      border: 1px solid #ccc;
      :first-of-type {
        border-radius: 20px 0 0 20px;
        border-right: none;
      }
      :last-of-type {
        border-radius: 0 20px 20px 0;
        border-left: none;
      }
    }
  }
`;
