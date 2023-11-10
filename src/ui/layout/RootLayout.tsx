"use client";

import React from "react";
import styled from "styled-components";
import {
  UserOutlined,
  FolderOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import ProfileBox from "./ProfileBox";
import { breakpoint } from "@/lib/responsive";

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
  .layout-sider {
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
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <Link href="/" className="sider-header-logo">
          <Image src="/png/logo.png" alt="logo" fill />
        </Link>

        {children}

        <ProfileBox />
      </Sider>
    </RootLayoutBlock>
  );
};

export default RootLayout;
