import { Button, Modal, ModalProps, message } from "antd";
import React from "react";
import styled from "styled-components";
import useMyStudyNotes from "./useMyStudyNotes";
import { IFolder } from "@/types/folder";
import {
  addStudyNoteToFolderAPI,
  removeStudyNoteFromFolderAPI,
} from "@/lib/apis/studyNote";
import { IStudyNote } from "@/types/studyNote";
import Link from "next/link";
import MyStudyNoteItem from "./MyStudyNoteItem";

const AddStudyNoteModalBlock = styled(Modal)`
  .my-study-notes-list {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
`;

interface AddStudyNoteModalProps extends Omit<ModalProps, "children"> {
  folder: IFolder;
  setNotes: (studyNotes: IStudyNote[]) => void;
}

const AddStudyNoteModal: React.FC<AddStudyNoteModalProps> = (props) => {
  const { myStudyNotes } = useMyStudyNotes();
  const { folder, setNotes, ...modalProps } = props;
  const addStudyNoteToFolder = async (studyNote: IStudyNote) => {
    try {
      const { data } = await addStudyNoteToFolderAPI({
        studyNoteId: studyNote.id,
        folderId: folder.id,
      });
      setNotes([...folder.studyNotes, studyNote]);
      if (data.error) return message.error(data.error);
    } catch {
      message.error("암기장 추가에 실패했습니다.");
    }
  };
  const removeStudyNoteFromFolder = async (studyNote: IStudyNote) => {
    try {
      const { data } = await removeStudyNoteFromFolderAPI({
        studyNoteId: studyNote.id,
        folderId: folder.id,
      });
      setNotes(folder.studyNotes.filter((note) => note.id !== studyNote.id));
      if (data.error) return message.error(data.error);
    } catch {
      message.error("암기장 삭제에 실패했습니다.");
    }
  };
  return (
    <AddStudyNoteModalBlock {...modalProps} footer={false} title="암기장 추가">
      <ul className="my-study-notes-list">
        <Link href={`/study-note/create?fid=${folder.id}`}>
          <Button type="dashed">새로운 암기장 만들기</Button>
        </Link>
        {myStudyNotes.map((studyNote) => (
          <MyStudyNoteItem
            key={studyNote.id}
            studyNote={studyNote}
            currentStudyNotes={folder.studyNotes}
            addStudyNoteToFolder={addStudyNoteToFolder}
            removeStudyNoteFromFolder={removeStudyNoteFromFolder}
          />
        ))}
      </ul>
    </AddStudyNoteModalBlock>
  );
};

export default AddStudyNoteModal;
