"use client";

import { Menu } from "antd";
import {
  UserOutlined,
  FolderOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const RootTemplateBlock = styled(Menu)``;

interface RootTemplateProps {}

const RootTemplate: React.FC<RootTemplateProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <RootTemplateBlock
      mode="inline"
      defaultSelectedKeys={["/public-storage"]}
      selectedKeys={[pathname]}
      onSelect={(item) => {
        router.push(item.key);
      }}
      items={[
        { icon: FolderOutlined, label: "내 암기장", path: "/my-storage" },
        {
          icon: FolderOutlined,
          label: "공유된 암기장",
          path: "/shared-storage",
        },
        {
          icon: ShareAltOutlined,
          label: "공개 암기장",
          path: "/public-storage",
        },
        { icon: UserOutlined, label: "내 정보", path: "/user" },
      ].map((item, index) => ({
        key: item.path,
        icon: React.createElement(item.icon),
        label: item.label,
      }))}
    />
  );
};

export default RootTemplate;
