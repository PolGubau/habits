import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Typography } from "antd";
import styled from "styled-components";

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
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
