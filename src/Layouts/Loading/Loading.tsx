import React from "react";
import styled from "styled-components";
const LoadingStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  align-content: center;
  flex-wrap: wrap;
  background-color: red;
`;
const LoadingPage = () => {
  return <LoadingStyled>LoadingPage</LoadingStyled>;
};

export default LoadingPage;
