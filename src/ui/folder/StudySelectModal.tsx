import { colors } from "@/styles/colors";
import { Button, Checkbox, InputNumber, Modal, ModalProps, Radio } from "antd";
import React from "react";
import styled from "styled-components";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ClearIcon from "@mui/icons-material/Clear";
import { StudyScore, StudyMode } from "@/types/folder";
import { useRouter } from "next/navigation";
import { addQueryParams } from "@/lib/utils/addQueryParams";

const StudySelectModalBlock = styled(Modal)`
  .study-select-random-checkbox-wrapper,
  .study-select-card-limit-wrapper,
  .study-select-score-checkbox-wrapper,
  .study-select-option-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .study-select-label {
    margin-bottom: 5px;
    font-size: 14px;
    color: ${colors.gray_800};
    font-weight: 500;
  }
  .study-select-description {
    margin-top: 5px;
    font-size: 12px;
    color: ${colors.gray_500};
  }
  .study-select-score-icon {
    font-size: 16px;
    position: relative;
    top: 3px;
  }
  .study-start-button {
    margin-top: 20px;
    width: 100%;
  }

  .study-select-score-checkbox-wrapper {
  }
  .study-select-card-limit-wrapper {
  }
`;

interface StudySelectModalProps extends Omit<ModalProps, "children"> {
  studyNoteIds: number[];
}

const StudySelectModal: React.FC<StudySelectModalProps> = (props) => {
  const { studyNoteIds, ...modalProps } = props;
  const router = useRouter();
  const [mode, setMode] = React.useState<StudyMode>(StudyMode.ANSWER);
  const [isRandom, setIsRandom] = React.useState<boolean>(false);
  const [scores, setScores] = React.useState<StudyScore[]>([]);
  const [limit, setLimit] = React.useState<number | null>(null);
  const handleScoreChange = (score: StudyScore) => {
    if (scores.includes(score)) {
      setScores((prev) => prev.filter((s) => s !== score));
    } else {
      setScores((prev) => [...prev, score]);
    }
  };
  const hadleScoreAllChange = () => {
    if (scores.length === 3) {
      setScores([]);
    } else {
      setScores([StudyScore.HIGH, StudyScore.LOW, StudyScore.NONE]);
    }
  };

  const handleStart = () => {
    const params = addQueryParams("/study", {
      mode,
      order: isRandom ? "random" : "normal",
      scores: scores.join(","),
      limit: limit ? limit.toString() : "",
      studyNoteIds: studyNoteIds.join(","),
    });
    router.push(params);
  };
  return (
    <StudySelectModalBlock {...modalProps} title="학습 설정하기">
      <div>
        <div className="study-select-option-wrapper">
          <label className="study-select-label">
            * 학습 형태를 선택해주세요.
          </label>
          <Radio.Group
            className="study-select-radio-group"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
            }}
          >
            <Radio.Button value={StudyMode.ANSWER}>해설</Radio.Button>
            <Radio.Button value={StudyMode.CARD}>카드</Radio.Button>
            <Radio.Button value={StudyMode.TYPYING}>타이핑</Radio.Button>
          </Radio.Group>
        </div>
        <div className="study-select-random-checkbox-wrapper">
          <label className="study-select-label">* 문제 순서</label>
          <div>
            <Checkbox
              checked={isRandom}
              onClick={() => setIsRandom((prev) => !prev)}
            >
              랜덤
            </Checkbox>
          </div>
        </div>
        <div className="study-select-score-checkbox-wrapper">
          <label className="study-select-label">* 점수별 필터링</label>
          <div>
            <Checkbox
              checked={scores.length === 3}
              onClick={hadleScoreAllChange}
            >
              전체
            </Checkbox>
            <Checkbox
              checked={scores.includes(StudyScore.HIGH)}
              onClick={() => handleScoreChange(StudyScore.HIGH)}
            >
              <PanoramaFishEyeIcon className="study-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={scores.includes(StudyScore.LOW)}
              onClick={() => handleScoreChange(StudyScore.LOW)}
            >
              <ClearIcon className="study-select-score-icon" />
            </Checkbox>
            <Checkbox
              checked={scores.includes(StudyScore.NONE)}
              onClick={() => handleScoreChange(StudyScore.NONE)}
            >
              무
            </Checkbox>
          </div>
          <p className="study-select-description">{`"무"는 점수가 체크 되지 않은 문항입니다.`}</p>
        </div>
        <div className="study-select-card-limit-wrapper">
          <label className="study-select-label">* 문항수</label>
          <InputNumber size="small" value={limit} onChange={setLimit} />
          <p className="study-select-description">{`입력하지 않을 경우 전체 문항이 출제됩니다.`}</p>
        </div>
        <Button
          className="study-start-button"
          type="primary"
          onClick={handleStart}
        >
          학습하기
        </Button>
      </div>
    </StudySelectModalBlock>
  );
};

export default StudySelectModal;
