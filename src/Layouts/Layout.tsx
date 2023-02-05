import React from "react";

import { FloatButton, Layout, Menu, theme } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { navElements } from "./NavElements";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Content, Sider } = Layout;
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
const Style = styled.main`
  height: 100vh;
  display: flex;
`;

const LayoutPage = ({ children }: any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Style>
      <Layout>
        <FloatButton icon={<QuestionCircleOutlined />} />
        <Sider
          style={{ background: colorBgContainer }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value: any) => setCollapsed(value)}
        >
          <Menu
            theme="light"
            color="primary"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["2"]}
            items={navElements}
            onClick={(e: any) => {
              router.push(`/${e.key}`);
            }}
          />
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Style>
  );
};

export default LayoutPage;
