import { IStudyNote } from "@/types/studyNote";
import React from "react";
import styled from "styled-components";
import { removeStudyNoteFromFolderAPI } from "@/lib/apis/studyNote";
import { message } from "antd";
import StudyNoteItem from "./StudyNoteItem";

const StudyNoteListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  gap: 10px 50px;
  flex-wrap: wrap;
`;

interface StudyNoteListProps {
  studyNotes: IStudyNote[];
  folderId: number;
  setNotes: (studyNotes: IStudyNote[]) => void;
}
const StudyNoteList: React.FC<StudyNoteListProps> = ({
  studyNotes,
  folderId,
  setNotes,
}) => {
  const removeNoteFromFolder = async (studyNoteId: number) => {
    const { data } = await removeStudyNoteFromFolderAPI({
      folderId,
      studyNoteId,
    });
    if (data.error) return message.error(data.error);
    const filteredStudyNotes = studyNotes.filter(
      (studyNote) => studyNote.id !== studyNoteId
    );
    setNotes(filteredStudyNotes);
  };
  return (
    <StudyNoteListBlock>
      {studyNotes?.map((studyNote) => (
        <StudyNoteItem
          key={studyNote.id}
          folderId={folderId}
          studyNote={studyNote}
          removeNoteFromFolder={removeNoteFromFolder}
        />
      ))}
    </StudyNoteListBlock>
  );
};

export default StudyNoteList;
