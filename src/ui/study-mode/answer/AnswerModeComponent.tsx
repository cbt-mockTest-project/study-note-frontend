import { IStudyCard } from "@/types/studyCard";
import React, { useState } from "react";
import styled from "styled-components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AnswerModeCardItem from "./AnswerModeCardItem";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "antd";

const AnswerModeComponentBlock = styled.div`
  .answer-mode-study-card-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .answer-mode-all-hide-toggle-button {
    margin-bottom: 15px;
  }
  .answer-mode-all-hide-toggle-button-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
`;

interface AnswerModeComponentProps {
  studyCards: IStudyCard[];
}

const AnswerModeComponent: React.FC<AnswerModeComponentProps> = ({
  studyCards,
}) => {
  const [isAnswerAllHidden, setIsAnswerAllHidden] = useState(false);

  return (
    <AnswerModeComponentBlock>
      <Button
        className="answer-mode-all-hide-toggle-button"
        onClick={() => setIsAnswerAllHidden(!isAnswerAllHidden)}
      >
        {isAnswerAllHidden ? (
          <div className="answer-mode-all-hide-toggle-button-inner">
            <VisibilityOffIcon />
            <span>정답 모두 보이기</span>
          </div>
        ) : (
          <div className="answer-mode-all-hide-toggle-button-inner">
            <RemoveRedEyeIcon />
            <span>정답 모두 가리기</span>
          </div>
        )}
      </Button>
      <ul className="answer-mode-study-card-list">
        {studyCards.map((studyCard, index) => (
          <AnswerModeCardItem
            key={studyCard.id}
            studyCard={studyCard}
            isAnswerAllHidden={isAnswerAllHidden}
            index={index}
          />
        ))}
      </ul>
    </AnswerModeComponentBlock>
  );
};

export default AnswerModeComponent;
