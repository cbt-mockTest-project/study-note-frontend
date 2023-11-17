import React from "react";
import styled from "styled-components";
import Card from "../common/card/Card";
import { IStudyNote } from "@/types/studyNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "@/styles/colors";
import { Checkbox } from "antd";
import Link from "next/link";
import { breakpoint } from "@/lib/responsive";

const StudyNoteItemBlock = styled.div`
  display: flex;
  width: calc(45% - 5px);
  gap: 15px;
  .study-note-link {
    width: 100%;
  }
  .study-note-card-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
  .study-note-title {
    font-weight: bold;
    color: ${colors.gray_700};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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

  @media (max-width: ${breakpoint.md}) {
    width: 100%;
  }
`;

interface StudyNoteItemProps {
  selectedNoteIds: number[];
  setSelectedNoteIds: (selectedStudyNoteIds: number[]) => void;
  studyNote: IStudyNote;
  folderId: number;
  removeNoteFromFolder: (studyNoteId: number) => void;
}

const StudyNoteItem: React.FC<StudyNoteItemProps> = ({
  studyNote,
  removeNoteFromFolder,
  folderId,
  selectedNoteIds,
  setSelectedNoteIds,
}) => {
  return (
    <StudyNoteItemBlock>
      <Checkbox
        checked={selectedNoteIds.includes(studyNote.id)}
        onClick={() => {
          if (selectedNoteIds.includes(studyNote.id)) {
            setSelectedNoteIds(
              selectedNoteIds.filter((id) => id !== studyNote.id)
            );
          } else {
            setSelectedNoteIds([...selectedNoteIds, studyNote.id]);
          }
        }}
      />
      <Link
        className="study-note-link"
        href={`/study-note/create?fid=${folderId}&nid=${studyNote.id}`}
      >
        <Card className="study-note-card">
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
    </StudyNoteItemBlock>
  );
};

export default StudyNoteItem;
