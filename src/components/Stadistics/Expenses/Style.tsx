import styled from "styled-components";

export const StadisticsStyled = styled.main`
  max-width: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .estadisticas {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 1px solid #d4d4d4;
    border-radius: 15px;
    background-color: #d4d4d4;
    gap: 1px;
    overflow: hidden;
    .stadistic {
      background-color: #ececec;
      min-width: 150px;
      display: flex;
      padding: 10px;
      justify-content: center;
      flex-grow: 1;
      align-items: center;
      flex-direction: column;
    }
  }
`;
