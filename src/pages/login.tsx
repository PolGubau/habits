import React from "react";
import CreateAccountForm from "src/components/Forms/Login/CreateAccountForm";
import LoginForm from "src/components/Forms/Login/LoginForm";

import styled from "styled-components";

const Styles = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  align-content: center;
  flex-wrap: wrap;

  .form {
    background-color: white;
    max-width: 300px;
  }
  .form-forgot {
    float: right;
  }
  .ant-col-rtl .form-forgot {
    float: left;
  }
  .form-button {
    width: 100%;
  }
`;

const LoginPage: React.FC = () => {
  return (
    <Styles>
      <LoginForm />
      <CreateAccountForm />
    </Styles>
  );
};

export default LoginPage;
