"use client";

import React, { useState } from "react";
import styled from "styled-components";
import BasicContentLayout from "../layout/BasicContentLayout";
import { IFolder } from "@/types/folder";
import { FolderOutlined } from "@ant-design/icons";
import { colors } from "@/styles/colors";
import Image from "next/image";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Modal, message } from "antd";
import FolderControlModal from "../common/folder/FolderControlModal";
import { pick } from "lodash";
import {
  PatchFolderInput,
  deleteFolderAPI,
  patchFolderAPI,
} from "@/lib/apis/folder";
import { useRouter } from "next/navigation";

const FolderComponentBlock = styled.div`
  position: relative;
  .folder-setting-button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid ${colors.gray_400};
    font-size: 25px;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${colors.gray_100};
    }
  }
  .folder-title-wrapper {
    font-size: 30px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .folder-description {
    margin-top: 5px;
  }
  .folder-setting-button-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .folder-user-info-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .folder-info-and-setting-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .folder-profile-image {
    border-radius: 50%;
    background-color: ${colors.gray_500};
    object-fit: contain;
  }
  .folder-user-name {
    font-weight: 600;
    font-size: 16px;
  }
  .folder-user-name-suffix {
    font-size: 12px;
    font-weight: 600;
    color: ${colors.gray_500};
  }
  .folder-study-note-blank-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
    gap: 10px;
  }
  .folder-study-note-blank-main-text {
    font-size: 30px;
    font-weight: 700;
    color: ${colors.gray_700};
  }
  .folder-study-note-blank-sub-text {
    font-weight: 500;
    color: ${colors.gray_500};
  }
  .folder-study-note-add-button {
    margin-top: 20px;
  }
`;

interface FolderComponentProps {
  folder: IFolder;
}

const FolderComponent: React.FC<FolderComponentProps> = ({ folder }) => {
  const router = useRouter();
  const [currentFolder, setCurrentFolder] = useState(folder);
  const [updateFolderInput, setUpdateFolderInput] = useState<PatchFolderInput>({
    name: folder.name,
    description: folder.description,
    access: folder.access,
  });
  const [updateFolderLoading, setUpdateFolderLoading] = useState(false);
  const [deleteFolderLoading, setDeleteFolderLoading] = useState(false);
  const [isFolderControlModalVisible, setIsFolderControlModalVisible] =
    useState(false);

  const patchFolder = async () => {
    try {
      setUpdateFolderLoading(true);
      if (!updateFolderInput.name?.trim())
        return message.error("제목을 입력하세요.");
      const { data } = await patchFolderAPI(
        String(currentFolder.id),
        updateFolderInput
      );
      if (data.ok) {
        setCurrentFolder((prev) => {
          return {
            ...prev,
            ...updateFolderInput,
          };
        });
      } else message.error(data.error);
    } catch {
      message.error("폴더를 수정하는데 실패했습니다.");
    } finally {
      setUpdateFolderLoading(false);
      setIsFolderControlModalVisible(false);
    }
  };
  const folderSettingOptions: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <button
          onClick={() => {
            Modal.confirm({
              title: "정말로 삭제하시겠습니까?",
              okButtonProps: {
                loading: deleteFolderLoading,
              },
              onOk: async () => {
                try {
                  setDeleteFolderLoading(true);
                  const { data } = await deleteFolderAPI(
                    String(currentFolder.id)
                  );
                  if (data.ok) message.success("폴더를 삭제했습니다.");
                  else message.error(data.error);
                  router.push("/my-storage");
                } catch {
                  message.error("폴더를 삭제하는데 실패했습니다.");
                } finally {
                  setDeleteFolderLoading(false);
                }
              },
            });
          }}
        >
          삭제하기
        </button>
      ),
    },
    {
      key: 2,
      label: (
        <button onClick={() => setIsFolderControlModalVisible(true)}>
          수정하기
        </button>
      ),
    },
    // TODO: 공유하기 기능 구현
    // {
    //   key: 3,
    //   label: <button>공유하기</button>,
    // },
  ];
  return (
    <BasicContentLayout>
      <FolderComponentBlock>
        <Dropdown
          menu={{ items: folderSettingOptions }}
          placement="bottomRight"
        >
          <button className="folder-setting-button">
            <EllipsisOutlined />
          </button>
        </Dropdown>
        <div className="folder-info-and-setting-wrapper">
          <div className="folder-user-info-wrapper">
            <Image
              className="folder-profile-image"
              src={currentFolder.user.picture}
              alt="프로필 이미지"
              width={25}
              height={25}
            />
            <div>
              <span className="folder-user-name">
                {currentFolder.user.nickname}
              </span>
              <span className="folder-user-name-suffix"> 님의 폴더</span>
            </div>
          </div>
        </div>
        <div className="folder-title-wrapper">
          <FolderOutlined />
          <h1>{currentFolder.name}</h1>
        </div>
        <p className="folder-description">{currentFolder.description}</p>
        {currentFolder.studyNotes.length === 0 ? (
          <div className="folder-study-note-blank-description">
            <p className="folder-study-note-blank-main-text">
              암기장이 없습니다.
            </p>
            <p className="folder-study-note-blank-sub-text">
              폴더를 통해 암기장을 관리하세요.
            </p>
            <Button
              className="folder-study-note-add-button"
              type="primary"
              size="large"
            >
              암기장 추가
            </Button>
          </div>
        ) : (
          <>폴더에 스터디 노트가 없습니다.</>
        )}
      </FolderComponentBlock>
      {isFolderControlModalVisible && (
        <FolderControlModal
          open={isFolderControlModalVisible}
          onChange={(data) => {
            setUpdateFolderInput((prev) => {
              return {
                ...prev,
                ...data,
              };
            });
          }}
          okText="수정하기"
          cancelText="취소"
          okButtonProps={{
            loading: updateFolderLoading,
          }}
          onCancel={() => {
            setIsFolderControlModalVisible(false);
          }}
          onOk={patchFolder}
          defaultValues={pick(currentFolder, ["access", "description", "name"])}
        />
      )}
    </BasicContentLayout>
  );
};

export default FolderComponent;
