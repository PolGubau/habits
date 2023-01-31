import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Typography } from "antd";
import styled from "styled-components";
import axios from "axios";
import PATH from "src/utils/path";
import {
  manageCreateAccount,
  USER_CODES,
} from "src/Services/ManageAccounts/CreateNewUserFunctions";
import { type } from "os";

const { Title } = Typography;

const Styles = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const LoginForm = () => {
  type InputStates = undefined | "warning" | "error";
  const [statusName, setStatusName] = React.useState<InputStates>(undefined);
  const onFinish = async (values: any) => {
    const state = await manageCreateAccount(values);
    switch (state) {
      case USER_CODES.USERNAME_TAKEN:
        setStatusName("error");
        break;
      case USER_CODES.CREATED_SUCCESSFULLY:
        alert("Account created");
        break;
      default:
        alert("Something went wrong");
        break;
    }
  };
  return (
    <Styles>
      <Title level={3}>Create Account</Title>

      <Form
        name="create_account"
        size="small"
        className="form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            status={statusName}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Type a correct email",
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
    </Styles>
  );
};

export default LoginForm;
