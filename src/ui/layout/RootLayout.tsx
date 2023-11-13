"use client";

import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import ProfileBox from "./ProfileBox";
import { breakpoint } from "@/lib/responsive";
import {
  UserOutlined,
  FolderOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import SideMenu from "./SideMenu";

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
  @media (max-width: ${breakpoint.lg}) {
    .ant-layout-sider {
      background-color: #fff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      z-index: 10;
      position: absolute !important;
      height: 100%;
    }
    .ant-layout-sider-zero-width-trigger {
      border: 1px solid black !important;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      border-left: none !important;
    }
  }
`;

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <RootLayoutBlock>
      <Sider
        className="layout-sider"
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
      >
        <Link href="/" className="sider-header-logo">
          <Image src="/png/logo.png" alt="logo" fill />
        </Link>
        <SideMenu
          onSelect={(path) => {}}
          items={[
            {
              icon: <FolderOutlined />,
              label: "내 암기장",
              path: "/my-storage",
            },
            {
              icon: <FolderOutlined />,
              label: "공유된 암기장",
              path: "/shared-storage",
            },
            {
              icon: <ShareAltOutlined />,
              label: "공개 암기장",
              path: "/public-storage",
            },
            {
              icon: <UserOutlined />,
              label: "내 정보",
              path: "/user/settings",
            },
          ]}
        />
        <ProfileBox />
      </Sider>
      {children}
    </RootLayoutBlock>
  );
};

export default RootLayout;
