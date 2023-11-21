import { colors } from "@/styles/colors";
import { QuillStyle } from "@/styles/quillStyle";
import Card from "@/ui/common/card/Card";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import parse from "html-react-parser";
import { CardScoreLevel, IStudyCard } from "@/types/studyCard";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Image, message } from "antd";
import { postCardScoreAPI } from "@/lib/apis/cardScore";

const AnswerModeCardItemBlock = styled.div`
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

  .answer-mode-study-card-image {
    width: 100%;
    height: 200px;
    object-fit: contain;
    margin-top: 10px;
    border-radius: 5px;
  }
  .answer-mode-study-card-anwswer-wrapper {
    transition: opacity 0.2s ease-in-out;
  }

  .answer-mode-study-card-anwswer-wrapper.hidden {
    opacity: 0;
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
  .answer-mode-control-button.active {
    border-color: ${colors.blue_700};
    color: ${colors.blue_700};
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
  const [currentScore, setCurrentScore] = useState<CardScoreLevel | null>(
    studyCard.myScore
  );
  const handleChangeScore = async (score: CardScoreLevel) => {
    const prevScore = currentScore;
    try {
      setCurrentScore(score);
      const { data } = await postCardScoreAPI({
        id: studyCard.id,
        body: { score },
      });
      if (data.error) message.error(data.error);
    } catch (e) {
      setCurrentScore(prevScore);
      console.log(e);
    }
  };
  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);
  return (
    <AnswerModeCardItemBlock>
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
            <div
              className={`answer-mode-study-card-anwswer-wrapper ${
                isAnswerHidden ? "hidden" : ""
              }`}
            >
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
        </div>
        {/* <div className="answer-mode-study-tool-box-wrapper">
          <button className="answer-mode-study-tool-box-button">
            <EditIcon />
          </button>
          <button className="answer-mode-study-tool-box-button">
            <DeleteIcon />
          </button>
        </div> */}
      </Card>
      <Card className="answer-mode-control-box">
        <button
          onClick={() => handleChangeScore(CardScoreLevel.HIGH)}
          className={`answer-mode-control-button ${
            currentScore === CardScoreLevel.HIGH ? "active" : ""
          }`}
        >
          <PanoramaFishEyeIcon />
        </button>
        <button
          onClick={() => handleChangeScore(CardScoreLevel.LOW)}
          className={`answer-mode-control-button ${
            currentScore === CardScoreLevel.LOW ? "active" : ""
          }`}
        >
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
