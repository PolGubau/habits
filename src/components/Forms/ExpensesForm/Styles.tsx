import styled from "styled-components";

export const ExpensesFormStyle = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
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
      padding: 8px;

      border: 1px solid #ccc;
    }
    select {
      border: 1px solid #ccc;
      :first-of-type {
        border-radius: 6px 0 0 6px;
        border-right: none;
      }
      :last-of-type {
        border-radius: 0 6px 6px 0;
        border-left: none;
      }
    }
  }
`;
