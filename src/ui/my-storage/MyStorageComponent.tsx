"use client";

import React from "react";
import styled from "styled-components";
import FolderList from "../common/folder/FolderList";
import { Select } from "antd";
import useFolders from "@/ui/common/folder/useFolders";
import { useRouter } from "next/navigation";
import { FolderFilter } from "@/types/folder";
import BasicContentLayout from "../layout/BasicContentLayout";

const MyStorageComponentBlock = styled.div`
  .my-storage-select {
    width: 200px;
    margin-bottom: 10px;
  }
`;

interface MyStorageComponentProps {}

const MyStorageComponent: React.FC<MyStorageComponentProps> = () => {
  // const router = useRouter();
  const { handleCreateFolder, isLoadingFolders, folders } = useFolders();
  return (
    <BasicContentLayout>
      <MyStorageComponentBlock>
        <Select
          className="my-storage-select"
          defaultValue={"me"}
          size="large"
          onChange={(value) => {
            if (value === FolderFilter.BOOKMARK) {
              // router.push("/my-storage?filter=bookmark");
            }
            if (value === FolderFilter.ME) {
              // router.push("/my-storage?filter=me");
            }
          }}
          options={[
            { value: "me", label: "내가 만든" },
            { value: "bookmark", label: "저장한" },
          ]}
        />
        <FolderList
          createFolder={handleCreateFolder}
          folders={folders}
          isLoading={isLoadingFolders}
        />
      </MyStorageComponentBlock>
    </BasicContentLayout>
  );
};

export default MyStorageComponent;
