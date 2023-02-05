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
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
    }
    div {
      :first-child {
        div {
          background-color: #ebebeb;
          border-radius: 5px 0 0 5px;
        }
      }
      :last-child {
        div {
          background-color: #ebebeb;

          border-radius: 0 5px 5px 0;
        }
      }
    }
  }
`;
