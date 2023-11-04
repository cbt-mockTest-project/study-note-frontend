import { colors } from "@/styles/colors";
import { Breadcrumb, Layout, theme } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import React from "react";
import styled from "styled-components";
const { Content, Footer } = Layout;

const BasicContentLayoutBlock = styled(Layout)``;

interface BasicContentLayoutProps {
  children: React.ReactNode;
  pathList?: string[];
}

const BasicContentLayout: React.FC<BasicContentLayoutProps> = ({
  children,
  pathList,
}) => {
  return (
    <BasicContentLayoutBlock>
      <Breadcrumb style={{ margin: "20px 0px 0px 16px" }}>
        {pathList?.map((path, index) => (
          <BreadcrumbItem key={path}>{path}</BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Content style={{ margin: "20px 16px 0" }}>
        <div style={{ padding: 24, minHeight: 360, background: colors.white }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Modu ©2023 Created by Eungwang
      </Footer>
    </BasicContentLayoutBlock>
  );
};

export default BasicContentLayout;
