import { colors } from "@/styles/colors";
import { QuillStyle } from "@/styles/quillStyle";
import Card from "@/ui/common/card/Card";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import parse from "html-react-parser";
import { IStudyCard } from "@/types/studyCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Image } from "antd";

interface AnswerModeCardItemBlockProps {
  isAnswerHidden: boolean;
}

const AnswerModeCardItemBlock = styled.div<AnswerModeCardItemBlockProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .answer-mode-study-card {
    display: flex;
    flex-direction: row;
    gap: 10px;
    position: relative;
  }
  .answer-mode-study-content-wrapper {
    ${QuillStyle}
  }
  .answer-mode-study-card-number {
    font-weight: bold;
    margin-bottom: 10px;

    color: ${colors.gray_600};
  }
  .answer-mode-study-card-answer-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: ${colors.gray_600};
  }
  .answer-mode-answer-box {
    margin-top: 20px;
  }
  .answer-mode-study-card-answer {
    ${(props) =>
      props.isAnswerHidden &&
      css`
        filter: blur(100px);
      `}
  }
  .answer-mode-study-card-image {
    width: 100%;
    height: 200px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .answer-mode-study-tool-box-wrapper {
    width: 60px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: flex-start;
  }
  .answer-mode-study-tool-box-button {
    border-radius: 50%;
    padding: 5px;
    margin: 0;
    transition: background-color 0.2s ease-in-out;
    svg {
      font-size: 20px;
    }
    &:hover {
      background-color: ${colors.gray_200};
    }
  }
  .answer-mode-control-box {
    display: flex;
    gap: 10px;
    padding: 10px 20px;
  }
  .answer-mode-control-button {
    padding: 5px;
    margin: 0;
    border: 2px solid ${colors.gray_200};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${colors.blue_700};
    }
    svg {
      font-size: 20px;
    }
  }
`;

interface AnswerModeCardItemProps {
  studyCard: IStudyCard;
  index: number;
  isAnswerAllHidden: boolean;
}

const AnswerModeCardItem: React.FC<AnswerModeCardItemProps> = ({
  studyCard,
  index,
  isAnswerAllHidden,
}) => {
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);
  return (
    <AnswerModeCardItemBlock isAnswerHidden={isAnswerHidden}>
      <Card className="answer-mode-study-card">
        <div className="answer-mode-study-content-wrapper">
          <p className="answer-mode-study-card-number">{index + 1}번</p>

          <div className="answer-mode-study-card-question">
            {parse(studyCard.question)}
          </div>
          {studyCard.question_img && (
            <Image
              className="answer-mode-study-card-image"
              src={studyCard.question_img}
              alt="문제이미지"
            />
          )}
          <div className="answer-mode-answer-box">
            <p className="answer-mode-study-card-answer-label">정답</p>
            <div className="answer-mode-study-card-answer">
              {parse(studyCard.answer)}
            </div>
            {studyCard.answer_img && (
              <Image
                className="answer-mode-study-card-image"
                src={studyCard.answer_img}
                alt="문제이미지"
              />
            )}
          </div>
        </div>
        <div className="answer-mode-study-tool-box-wrapper">
          <button className="answer-mode-study-tool-box-button">
            <EditIcon />
          </button>
          <button className="answer-mode-study-tool-box-button">
            <DeleteIcon />
          </button>
        </div>
      </Card>
      <Card className="answer-mode-control-box">
        <button className="answer-mode-control-button">
          <PanoramaFishEyeIcon />
        </button>
        <button className="answer-mode-control-button">
          <ClearIcon />
        </button>
        <button
          className="answer-mode-control-button"
          onClick={() => setIsAnswerHidden(!isAnswerHidden)}
        >
          {isAnswerHidden ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </button>
      </Card>
    </AnswerModeCardItemBlock>
  );
};

export default AnswerModeCardItem;
