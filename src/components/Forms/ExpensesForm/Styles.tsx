import styled from "styled-components";

export const ExpensesFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  .line {
    max-width: 700px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .name,
    .price {
      flex: 1;
    }

    .amount-box {
      display: flex;
      align-items: center;
      max-width: 300px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding-left: 0.5rem;
      overflow: hidden;
      .prefix {
        font-weight: 300;
        font-size: 14px;
        color: #999;
      }
      .amount {
        flex-grow: 1;
        font-size: 14px;
        background: #fff;
        border: none;
        outline: none;
        padding: 0.5rem;
      }
    }

    .amount-box:focus-within {
      border-color: #777;
    }
  }
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
