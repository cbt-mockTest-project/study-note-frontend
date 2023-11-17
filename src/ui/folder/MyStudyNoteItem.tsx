import { IStudyNote } from "@/types/studyNote";
import { Button } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const MyStudyNoteItemBlock = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

interface MyStudyNoteItemProps {
  currentStudyNotes: IStudyNote[];
  studyNote: IStudyNote;
  addStudyNoteToFolder: (studyNote: IStudyNote) => void;
  removeStudyNoteFromFolder: (studyNote: IStudyNote) => void;
}

const MyStudyNoteItem: React.FC<MyStudyNoteItemProps> = ({
  currentStudyNotes,
  studyNote,
  addStudyNoteToFolder,
  removeStudyNoteFromFolder,
}) => {
  const status: "added" | "notAdded" = useMemo(() => {
    const isAdded = currentStudyNotes.find(
      (currentStudyNote) => currentStudyNote.id === studyNote.id
    );
    return isAdded ? "added" : "notAdded";
  }, [studyNote, currentStudyNotes]);
  const isAdded = useMemo(() => status === "added", [status]);
  return (
    <MyStudyNoteItemBlock>
      <p>{studyNote.name}</p>
      <Button
        type={isAdded ? "primary" : "default"}
        onClick={() =>
          isAdded
            ? removeStudyNoteFromFolder(studyNote)
            : addStudyNoteToFolder(studyNote)
        }
      >
        {isAdded ? <MinusOutlined /> : <PlusOutlined />}
      </Button>
    </MyStudyNoteItemBlock>
  );
};

export default MyStudyNoteItem;
