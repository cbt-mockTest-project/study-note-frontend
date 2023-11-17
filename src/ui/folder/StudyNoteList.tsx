import { IStudyNote } from "@/types/studyNote";
import React from "react";
import styled from "styled-components";
import Card from "../common/card/Card";
import { colors } from "@/styles/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { breakpoint } from "@/lib/responsive";
import Link from "next/link";
import { IFolder } from "@/types/folder";
import { removeStudyNoteFromFolderAPI } from "@/lib/apis/studyNote";
import { message } from "antd";

const StudyNoteListBlock = styled.ul`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  .study-note-link {
    width: calc(50% - 5px);
  }

  .study-note-title {
    font-weight: bold;
    color: ${colors.gray_700};
  }
  .study-note-card-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .study-note-delete-button {
    transition: background-color 0.2s ease-in-out;
    border-radius: 50%;
    padding: 5px;
    margin: 0;
    &:hover {
      background-color: ${colors.gray_300};
    }
  }
  .study-note-title-count-wrapper {
    display: flex;
    gap: 5px;
    flex-direction: column;
  }
  .study-note-count {
    font-size: 12px;
    color: ${colors.gray_400};
    font-weight: bold;
  }
  @media (max-width: ${breakpoint.md}) {
    .study-note-card {
      width: 100%;
    }
  }
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
        <Link
          className="study-note-link"
          href={`/study-note/create?fid=${folderId}&nid=${studyNote.id}`}
          key={studyNote.id}
        >
          <Card className="study-note-card" key={studyNote.id}>
            <div className="study-note-card-inner">
              <div className="study-note-title-count-wrapper">
                <p className="study-note-title">{studyNote.name}</p>
                <p className="study-note-count">
                  {studyNote.studyCardOrder.length}문항
                </p>
              </div>
              <button
                className="study-note-delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeNoteFromFolder(studyNote.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </Card>
        </Link>
      ))}
    </StudyNoteListBlock>
  );
};

export default StudyNoteList;
