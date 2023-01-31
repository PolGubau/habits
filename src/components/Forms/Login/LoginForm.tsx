import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Typography } from "antd";
import styled from "styled-components";

import {
  login,
  USER_CODES,
} from "src/Services/ManageAccounts/CreateNewUserFunctions";
import { useRouter } from "next/router";
import PATH from "src/utils/path";
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

export type NoticeType = "info" | "success" | "error" | "warning" | "loading";

const LoginForm = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const popUpMessage = (type: NoticeType = "success", message = "Message") => {
    messageApi.open({
      type: type,
      content: message,
    });
  };
  const successLoading = () => {
    messageApi
      .open({
        type: "loading",
        content: "Loading In..",
        duration: 2.5,
      })
      .then(() => message.success("Loading finished", 2.5))
      .then(() => message.info("Loading finished", 2.5));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      popUpMessage("warning", "You are already logged in");
      router.push(PATH.HOME);
    }
  }, []);
  const onFinish = async (values: any) => {
    const loginState = await login(values);

    switch (loginState) {
      case USER_CODES.WRONG_PASSWORD:
        popUpMessage("error", "Wrong password");

        break;
      case USER_CODES.USER_NOT_FOUND:
        popUpMessage("error", "User not found");

        break;
      case USER_CODES.LOGED_IN:
        successLoading();

        router.push(PATH.HOME);

        break;
      default:
        popUpMessage("error", "Something went wrong");

        break;
    }
  };
  return (
    <Styles>
      {contextHolder}
      <Title>Login</Title>

      <Form
        name="normal_login"
        className="form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Styles>
  );
};

export default LoginForm;
