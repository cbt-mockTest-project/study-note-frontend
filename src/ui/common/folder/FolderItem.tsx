import { colors } from "@/styles/colors";
import React from "react";
import styled from "styled-components";
import { FolderOutlined } from "@ant-design/icons";

const FolderItemBlock = styled.div`
  border-radius: 10px;
  background-color: ${colors.blue_25};
  width: 100%;
  display: flex;
  padding: 0 20px;
  height: 45px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  .folder-icon-wrapper {
    font-size: 18px;
  }
  .folder-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
  }
`;

export interface FolderItemProps {
  name?: string;
  style?: React.CSSProperties;
}

const FolderItem: React.FC<FolderItemProps> = ({ name = "폴더", style }) => {
  return (
    <FolderItemBlock style={style}>
      <div className="folder-icon-wrapper">
        <FolderOutlined />
      </div>

      <div className="folder-name">{name}</div>
    </FolderItemBlock>
  );
};

export default FolderItem;
