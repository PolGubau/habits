import { BarChartOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import React from "react";

export const navElements: MenuProps["items"] = [
  {
    key: 1,
    icon: <UserOutlined />,
    label: "Inicio",
    children: [
      {
        key: "profile",
        label: "Tu perfil",
      },
    ],
  },
  {
    key: 2,
    icon: <BarChartOutlined />,
    label: "Tus hábitos",
    children: [
      {
        key: "expenses",
        label: "Tus gastos",
      },
      {
        key: "food",
        label: "Tus comidas",
      },
      {
        key: "shower",
        label: "Tus duchas",
      },
      {
        key: "sleep",
        label: "Tu descanso",
      },
    ],
  },
];
