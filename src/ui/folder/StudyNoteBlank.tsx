import { colors } from "@/styles/colors";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const StudyNoteBlankBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  gap: 10px;
  .study-note-blank-main-text {
    font-size: 30px;
    font-weight: 700;
    color: ${colors.gray_700};
  }
  .study-note-blank-sub-text {
    font-weight: 500;
    color: ${colors.gray_500};
  }
  .study-note-add-button {
    margin-top: 20px;
  }
`;

interface StudyNoteBlankProps {
  openAddStudyModal: () => void;
}

const StudyNoteBlank: React.FC<StudyNoteBlankProps> = ({
  openAddStudyModal,
}) => {
  return (
    <StudyNoteBlankBlock>
      <p className="study-note-blank-main-text">암기장이 없습니다.</p>
      <p className="study-note-blank-sub-text">
        폴더를 통해 암기장을 관리하세요.
      </p>
      <Button
        className="study-note-add-button"
        type="primary"
        size="large"
        onClick={openAddStudyModal}
      >
        암기장 추가
      </Button>
    </StudyNoteBlankBlock>
  );
};

export default StudyNoteBlank;
