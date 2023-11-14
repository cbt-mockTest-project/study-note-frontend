"use client";

import React, { useState } from "react";
import styled from "styled-components";
import FolderList from "../common/folder/FolderList";
import { Select } from "antd";
import useFolders from "@/ui/common/folder/useFolders";
import { useRouter } from "next/navigation";
import { FolderAccess, FolderFilter } from "@/types/folder";
import BasicContentLayout from "../layout/BasicContentLayout";
import FolderPlusButton from "../common/folder/FolderPlusButton";
import useMe from "@/lib/hooks/useMe";
import FolderControlModal from "../common/folder/FolderControlModal";
import LoginModal from "../common/login/LoginModal";
import { CreateFolderInput } from "@/lib/apis/folder";
import FolderItem from "../common/folder/FolderItem";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { colors } from "@/styles/colors";

const MyStorageComponentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .my-storage-select {
    width: 200px;
  }
`;

interface MyStorageComponentProps {}

const MyStorageComponent: React.FC<MyStorageComponentProps> = () => {
  const router = useRouter();
  const { me } = useMe();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [createFolderInput, setCreateFolderInput] = useState<CreateFolderInput>(
    {
      name: "",
      access: FolderAccess.PUBLIC,
    }
  );
  const { createFolder, getFoldersLoading, folders, createFolderLoading } =
    useFolders();
  const handlePlusButtonClick = () => {
    if (!me?.data.ok) return setIsLoginModalVisible(true);
    setIsCreateModalVisible(true);
  };
  console.log(folders);
  return (
    <BasicContentLayout>
      <MyStorageComponentBlock>
        <Select
          className="my-storage-select"
          defaultValue={"me"}
          size="large"
          onChange={(value) => {
            if (value === FolderFilter.BOOKMARK) {
              router.push("/my-storage?filter=bookmark");
            }
            if (value === FolderFilter.ME) {
              router.push("/my-storage?filter=me");
            }
          }}
          options={[
            { value: "me", label: "내가 만든" },
            { value: "bookmark", label: "저장한" },
          ]}
        />
        <FolderPlusButton onClick={handlePlusButtonClick} />
        {me?.data.ok && (
          <Link href={routes.myNotes}>
            <FolderItem name="전체 암기장" />
          </Link>
        )}
        <FolderList folders={folders} getFoldersLoading={getFoldersLoading} />
      </MyStorageComponentBlock>
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
    </BasicContentLayout>
  );
};

export default MyStorageComponent;
