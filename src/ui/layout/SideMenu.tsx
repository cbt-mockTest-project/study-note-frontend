import { colors } from "@/styles/colors";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

const SideMenuBlock = styled.ul`
  .side-menu-list-item {
    display: flex;
    align-items: center;
    padding: 0px 16px 0px 24px;
    height: 40px;
    margin: 4px;
    cursor: pointer;
    transition: 0.2s background-color ease-in-out;
    color: ${colors.gray_900};
    border-radius: 6px;
    &:hover {
      background-color: ${colors.gray_100};
    }
    svg {
      margin-right: 10px;
    }
  }
  .side-menu-list-item.menu-selected {
    background-color: ${colors.blue_50};
    color: ${colors.blue_600};
  }
`;

interface SideMenuProps {
  onSelect: (path: string) => void;
  items: { path: string; icon: React.ReactNode; label: string }[];
}

const SideMenu: React.FC<SideMenuProps> = ({ items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <SideMenuBlock>
      {items.map((item, index) => (
        <Link key={index} href={item.path}>
          <li
            role="button"
            className={`side-menu-list-item${
              index === selectedIndex ? " menu-selected" : ""
            } ${item.path}`}
            onClick={() => setSelectedIndex(index)}
          >
            {item.icon}
            {item.label}
          </li>
        </Link>
      ))}
    </SideMenuBlock>
  );
};

export default SideMenu;
