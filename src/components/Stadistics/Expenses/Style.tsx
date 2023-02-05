import styled from "styled-components";

export const StadisticsStyled = styled.main`
  max-width: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .stadistic {
    display: flex;
    background-color: #e7e7e7;
    padding: 10px;
    align-items: center;
    flex-direction: column;
    max-width: 200px;
    flex-grow: 1;
    border-right: 1px solid #b2b2b2;
    :first-child {
      border-radius: 15px 0 0 15px;
    }
    :last-child {
      border-right: none;
      border-radius: 0 15px 15px 0;
    }
  }
`;
