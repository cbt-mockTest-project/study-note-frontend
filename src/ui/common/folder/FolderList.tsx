import React, { useState } from "react";
import styled from "styled-components";
import FolderItem from "./FolderItem";
import FolderPlusButton from "./FolderPlusButton";
import { IFolder, FolderAccess } from "@/types/folder";
import SkeletonBox from "../skeleton/SkeletonBox";
import { CreateFolderInput } from "@/lib/apis/folder";
import FolderControlModal from "./FolderControlModal";
import Link from "next/link";
import useMe from "@/lib/hooks/useMe";
import LoginModal from "../login/LoginModal";

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
  .folder-list-item-link {
    color: black;
  }
`;

interface FolderListProps {
  folders: IFolder[];
  createFolder: (createFolderInput: CreateFolderInput) => Promise<void>;
  getFoldersLoading: boolean;
  createFolderLoading: boolean;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  getFoldersLoading,
  createFolderLoading,
  createFolder,
}) => {
  const { me } = useMe();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [createFolderInput, setCreateFolderInput] = useState<CreateFolderInput>(
    {
      name: "",
      access: FolderAccess.PUBLIC,
    }
  );

  const handlePlusButtonClick = () => {
    if (!me?.data.ok) return setIsLoginModalVisible(true);
    setIsCreateModalVisible(true);
  };
  return (
    <FolderListBlock>
      <FolderPlusButton onClick={handlePlusButtonClick} />
      <div className="folder-list-item-wrapper">
        {!getFoldersLoading &&
          folders.map((folder) => (
            <Link
              className="folder-list-item-link"
              key={folder.id}
              href={`/folder/${folder.id}`}
            >
              <li>
                <FolderItem {...folder} />
              </li>
            </Link>
          ))}
      </div>
      {getFoldersLoading &&
        [1, 2, 3, 4].map((el) => (
          <SkeletonBox key={el} width="100%" height="45px" radius="10px" />
        ))}
      <FolderControlModal
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        okText="만들기"
        cancelText="취소"
        onOk={async () => {
          await createFolder(createFolderInput);
          setIsCreateModalVisible(false);
        }}
        okButtonProps={{
          loading: createFolderLoading,
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
      <LoginModal
        open={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
      />
    </FolderListBlock>
  );
};

export default FolderList;
