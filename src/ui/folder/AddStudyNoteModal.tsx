import { Button, Card, Modal, ModalProps, message } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import useMyStudyNotes from "./useMyStudyNotes";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { IFolder } from "@/types/folder";
import { addStudyNoteToFolderAPI } from "@/lib/apis/studyNote";
import { IStudyNote } from "@/types/studyNote";
import Link from "next/link";

const AddStudyNoteModalBlock = styled(Modal)`
  .my-study-notes-list {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .my-study-notes-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
`;

interface AddStudyNoteModalProps extends Omit<ModalProps, "children"> {
  setCurrentFolder: Dispatch<SetStateAction<IFolder>>;
  currentFolder: IFolder;
}

const AddStudyNoteModal: React.FC<AddStudyNoteModalProps> = (props) => {
  const { myStudyNotes } = useMyStudyNotes();
  const { currentFolder, setCurrentFolder, ...modalProps } = props;
  const addStudyNoteToFolder = async (studyNote: IStudyNote) => {
    try {
      const { data } = await addStudyNoteToFolderAPI({
        studyNoteId: studyNote.id,
        folderId: currentFolder.id,
      });
      setCurrentFolder((prev) => ({
        ...prev,
        studyNotes: [...prev.studyNotes, studyNote],
      }));
      if (data.error) return message.error(data.error);
    } catch {
      message.error("암기장 추가에 실패했습니다.");
    }
  };
  return (
    <AddStudyNoteModalBlock {...modalProps} footer={false} title="암기장 추가">
      <ul className="my-study-notes-list">
        <Link href={`/study-note/create?fid=${currentFolder.id}`}>
          <Button type="dashed">새로운 암기장 만들기</Button>
        </Link>
        {myStudyNotes.map((studyNote) => (
          <li className="my-study-notes-list-item" key={studyNote.id}>
            <p>{studyNote.name}</p>
            <Button onClick={() => addStudyNoteToFolder(studyNote)}>
              <PlusOutlined />
            </Button>
            <Button type="primary">
              <MinusOutlined />
            </Button>
          </li>
        ))}
      </ul>
    </AddStudyNoteModalBlock>
  );
};

export default AddStudyNoteModal;
