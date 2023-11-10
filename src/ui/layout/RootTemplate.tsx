"use client";

import { Menu } from "antd";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styled from "styled-components";
import { routes } from "@/lib/routes";

const RootTemplateBlock = styled(Menu)``;

interface RootTemplateProps {
  children: React.ReactNode;
}

const RootTemplate: React.FC<RootTemplateProps> = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    const menuItems = document.querySelectorAll(".side-menu-list-item");
    menuItems.forEach((item) => {
      if (routes.menu[item.textContent || ""] === pathname)
        item.classList.add("menu-selected");
      else item.classList.remove("menu-selected");
    });
  }, [pathname]);
  return <>{children}</>;
};

export default RootTemplate;
