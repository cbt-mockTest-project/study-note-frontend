"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { menuMap } from "@/lib/routes";

interface RootTemplateProps {
  children: React.ReactNode;
}

const RootTemplate: React.FC<RootTemplateProps> = ({ children }) => {
  const pathname = usePathname();
  const hasNotSideMenu = [
    "/study-note/create",
    "/study/answer",
    "/study/card",
    "/study/typing",
  ].includes(pathname);
  useEffect(() => {
    if (!pathname) return;
    console.log(pathname);
    const menuItems = document.querySelectorAll(".side-menu-list-item");
    const sideMenu = document.querySelector(".ant-layout-sider");
    menuItems.forEach((item) => {
      if (menuMap[item.textContent || ""] === pathname)
        item.classList.add("menu-selected");
      else item.classList.remove("menu-selected");
    });
    if (hasNotSideMenu) {
      sideMenu?.setAttribute("style", "display: none");
    } else {
      sideMenu?.setAttribute("style", "display: block");
      sideMenu?.setAttribute("style", "width: 200px");
    }
  }, [pathname]);

  return <>{children}</>;
};

export default RootTemplate;
