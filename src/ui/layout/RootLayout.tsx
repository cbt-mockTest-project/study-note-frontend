"use client";

import React from "react";
import styled from "styled-components";
import {
  UserOutlined,
  FolderOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const { Sider } = Layout;

const RootLayoutBlock = styled(Layout)`
  min-height: 100vh !important;
  .sider-header-logo {
    position: relative;
    display: block;
    height: 50px;
    padding: 10px 0;
    img {
      padding: 0px 15px;
      object-fit: contain;
    }
  }
`;

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <RootLayoutBlock>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <Link href="/" className="sider-header-logo">
          <Image src="/png/logo.png" alt="logo" fill />
        </Link>
        <Menu
          mode="inline"
          defaultSelectedKeys={["/public-note"]}
          selectedKeys={[pathname]}
          onSelect={(item) => {
            router.push(item.key);
          }}
          items={[
            { icon: FolderOutlined, label: "내 암기장", path: "/my-note" },
            {
              icon: FolderOutlined,
              label: "공유된 암기장",
              path: "/shared-note",
            },
            {
              icon: ShareAltOutlined,
              label: "공개 암기장",
              path: "/public-note",
            },
            { icon: UserOutlined, label: "내 정보", path: "/user" },
          ].map((item, index) => ({
            key: item.path,
            icon: React.createElement(item.icon),
            label: item.label,
          }))}
        />
      </Sider>
      {children}
    </RootLayoutBlock>
  );
};

export default RootLayout;
