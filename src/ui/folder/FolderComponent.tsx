"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicContentLayout from "../layout/BasicContentLayout";
import { FolderOutlined } from "@ant-design/icons";
import { colors } from "@/styles/colors";
import Image from "next/image";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  MenuProps,
  Modal,
  Popover,
  message,
} from "antd";
import FolderControlModal from "../common/folder/FolderControlModal";
import { pick } from "lodash";
import {
  PatchFolderInput,
  deleteFolderAPI,
  patchFolderAPI,
} from "@/lib/apis/folder";
import { useRouter } from "next/navigation";
import StudyNoteBlank from "./StudyNoteBlank";
import AddStudyNoteModal from "./AddStudyNoteModal";
import StudyNoteList from "./StudyNoteList";
import useFolder from "./useFolder";
import FolderSkeleton from "./FolderSkeleton";
import StudySelectModal from "./StudySelectModal";
import useMe from "@/lib/hooks/useMe";
import { IStudySetting } from "@/types/history";

const FolderComponentBlock = styled.div`
  position: relative;
  .folder-setting-button-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .folder-setting-button,
  .folder-add-study-note-button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid ${colors.gray_300};
    font-size: 25px;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${colors.gray_100};
    }
  }
  .folder-add-study-note-button {
    font-size: 18px;
  }
  .folder-title-wrapper {
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .folder-description {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray_500};
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
  .folder-study-start-button {
    margin-top: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .folder-study-all-checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 17px;
  }
`;

interface FolderComponentProps {
  id: string;
}

const FolderComponent: React.FC<FolderComponentProps> = ({ id }) => {
  const router = useRouter();
  const { me } = useMe();
  const { folder, setFolder, setNotes, isLoadingFolder } = useFolder(id);
  const [updateFolderInput, setUpdateFolderInput] = useState<PatchFolderInput>({
    name: folder?.name,
    description: folder?.description,
    access: folder?.access,
  });
  const [selectedNoteIds, setSelectedNoteIds] = useState<number[]>([]);
  const [updateFolderLoading, setUpdateFolderLoading] = useState(false);
  const [deleteFolderLoading, setDeleteFolderLoading] = useState(false);
  const [prevStudySetting, setPrevStudySetting] =
    useState<IStudySetting | null>(null);
  const [isFolderControlModalVisible, setIsFolderControlModalVisible] =
    useState(false);
  const [isAddStudyNoteModalVisible, setIsAddStudyNoteModalVisible] =
    useState(false);
  const [isStudyStartModalVisible, setIsStudyStartModalVisible] =
    useState(false);

  const patchFolder = async () => {
    try {
      if (!folder) return message.error("폴더를 찾을 수 없습니다.");
      setUpdateFolderLoading(true);
      if (!updateFolderInput.name?.trim())
        return message.error("제목을 입력하세요.");
      const { data } = await patchFolderAPI(
        String(folder.id),
        updateFolderInput
      );
      if (data.ok) {
        setFolder({ ...folder, ...updateFolderInput });
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
                  if (!folder) return message.error("폴더를 찾을 수 없습니다.");
                  setDeleteFolderLoading(true);
                  const { data } = await deleteFolderAPI(String(folder.id));
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
  ];
  useEffect(() => {
    if (!me || !folder) return;
    const user = me.data.user;
    const history = user.history.studySettings.findIndex(
      (studySetting) => studySetting.folderId === folder.id
    );
    if (history === -1) return;
    const studySetting = user.history.studySettings[history];
    setPrevStudySetting(studySetting);
    setSelectedNoteIds(studySetting.studyNoteIds);
  }, [me, folder]);

  if (!folder || isLoadingFolder) return <FolderSkeleton />;

  return (
    <BasicContentLayout>
      <FolderComponentBlock>
        <div className="folder-setting-button-wrapper">
          <Popover
            trigger="hover"
            content="암기장 추가"
            placement="bottomRight"
          >
            <button
              className="folder-add-study-note-button"
              onClick={() => setIsAddStudyNoteModalVisible(true)}
            >
              <PlusOutlined />
            </button>
          </Popover>
          <Dropdown
            menu={{ items: folderSettingOptions }}
            placement="bottomRight"
          >
            <button className="folder-setting-button">
              <EllipsisOutlined />
            </button>
          </Dropdown>
        </div>
        <div className="folder-info-and-setting-wrapper">
          <div className="folder-user-info-wrapper">
            <Image
              className="folder-profile-image"
              src={folder.user.picture}
              alt="프로필 이미지"
              width={25}
              height={25}
            />
            <div>
              <span className="folder-user-name">{folder.user.nickname}</span>
              <span className="folder-user-name-suffix"> 님의 폴더</span>
            </div>
          </div>
        </div>
        <div className="folder-title-wrapper">
          <FolderOutlined />
          <h1>{folder.name}</h1>
        </div>
        <p className="folder-description">{folder.description}</p>
        {folder.studyNotes.length > 0 && (
          <>
            <Button
              className="folder-study-start-button"
              type="primary"
              disabled={selectedNoteIds.length === 0}
              onClick={() => setIsStudyStartModalVisible(true)}
            >
              학습하기
            </Button>
            <div className="folder-study-all-checkbox-wrapper">
              <Checkbox
                checked={folder.studyNotes.length === selectedNoteIds.length}
                onClick={() => {
                  if (folder.studyNotes.length === selectedNoteIds.length)
                    setSelectedNoteIds([]);
                  else
                    setSelectedNoteIds(
                      folder.studyNotes.map((studyNote) => studyNote.id)
                    );
                }}
              />
              <span>전체 선택</span>
            </div>
          </>
        )}

        {folder.studyNotes.length === 0 ? (
          <StudyNoteBlank
            openAddStudyModal={() => setIsAddStudyNoteModalVisible(true)}
          />
        ) : (
          <StudyNoteList
            studyNotes={folder.studyNotes}
            setSelectedNoteIds={setSelectedNoteIds}
            selectedNoteIds={selectedNoteIds}
            folderId={folder.id}
            setNotes={setNotes}
          />
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
          defaultValues={pick(folder, ["access", "description", "name"])}
        />
      )}
      {isAddStudyNoteModalVisible && (
        <AddStudyNoteModal
          open={isAddStudyNoteModalVisible}
          folder={folder}
          setNotes={setNotes}
          onCancel={() => setIsAddStudyNoteModalVisible(false)}
        />
      )}
      {isStudyStartModalVisible && (
        <StudySelectModal
          footer={null}
          folderId={folder.id}
          studyNoteIds={selectedNoteIds}
          open={isStudyStartModalVisible}
          prevStudySetting={prevStudySetting}
          onCancel={() => setIsStudyStartModalVisible(false)}
        />
      )}
    </BasicContentLayout>
  );
};

export default FolderComponent;
