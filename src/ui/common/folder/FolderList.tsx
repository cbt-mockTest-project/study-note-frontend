import React, { useState } from "react";
import styled from "styled-components";
import FolderItem from "./FolderItem";
import FolderPlusButton from "./FolderPlusButton";
import { IFolder, FolderAccess } from "@/types/folder";
import SkeletonBox from "../skeleton/SkeletonBox";
import { CreateFolderInput } from "@/lib/apis/folder";
import CreateFolderModal from "./CreateFolderModal";
import { message } from "antd";

const FolderListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .folder-list-item-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: calc(100vh - 200px);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface FolderListProps {
  folders: IFolder[];
  createFolder: (createFolderInput: CreateFolderInput) => void;
  isLoading?: boolean;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  isLoading,
  createFolder,
}) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createFolderInput, setCreateFolderInput] = useState<CreateFolderInput>(
    {
      name: "",
      access: FolderAccess.PUBLIC,
    }
  );
  return (
    <FolderListBlock>
      <FolderPlusButton onClick={() => setIsCreateModalVisible(true)} />
      <div className="folder-list-item-wrapper">
        {!isLoading &&
          folders.map((folder) => (
            <li key={folder.id}>
              <FolderItem {...folder} />
            </li>
          ))}
      </div>
      {isLoading &&
        [1, 2, 3, 4].map((el) => (
          <SkeletonBox key={el} width="100%" height="45px" radius="10px" />
        ))}
      <CreateFolderModal
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        okText="만들기"
        cancelText="취소"
        onOk={() => {
          if (!createFolderInput.name.trim())
            return message.error("제목을 입력하세요.");
          createFolder(createFolderInput);
          setIsCreateModalVisible(false);
        }}
        onChange={(createFolderInput) =>
          setCreateFolderInput((prev) => {
            return {
              ...prev,
              ...createFolderInput,
            };
          })
        }
      />
    </FolderListBlock>
  );
};

export default FolderList;
