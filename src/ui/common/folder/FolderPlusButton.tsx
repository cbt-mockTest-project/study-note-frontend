import { colors } from "@/styles/colors";
import React from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

const FolderPlusButtonBlock = styled.button`
  border-radius: 10px;
  border: 2.5px dashed ${colors.blue_25};
  width: 100%;
  display: flex;
  padding: 0 20px;
  height: 45px;
  gap: 10px;
  align-items: center;
  color: ${colors.blue_400};
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${colors.gray_50};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${colors.gray_400};
    border: 2.5px dashed ${colors.gray_200};
    &:hover {
      background-color: ${colors.white};
    }
  }
`;

interface FolderPlusButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const FolderPlusButton: React.FC<FolderPlusButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <FolderPlusButtonBlock onClick={onClick} disabled={disabled}>
      <PlusOutlined />
      <p>폴더 추가</p>
    </FolderPlusButtonBlock>
  );
};

export default FolderPlusButton;
