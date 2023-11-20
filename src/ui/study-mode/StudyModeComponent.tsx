"use client";

import { StudyMode } from "@/types/folder";
import BasicHeader from "@/ui/layout/BasicHeader";
import React from "react";
import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { colors } from "@/styles/colors";
import { Button } from "antd";
import AnswerModeComponent from "./answer/AnswerModeComponent";
import CardModeComponent from "./card/CardModeComponent";
import TypingModeComponent from "./typing/TypingModeComponent";
import useStudyCards from "./useStudyCards";
import BasicBody from "../layout/BasicBody";

const StudyModeComponentBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  height: 100vh;

  .answer-mode-router-back-button {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.gray_900};
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .answer-mode-title {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.gray_900};
  }
`;

interface StudyModeComponentProps {
  mode: StudyMode;
}

const StudyModeComponent: React.FC<StudyModeComponentProps> = ({ mode }) => {
  const router = useRouter();
  const params = useSearchParams();
  const order = params.get("order");
  const studyNoteIds = params.get("studyNoteIds");
  const scores = params.get("scores");
  const limit = params.get("limit");

  const { studyCards } = useStudyCards({
    order: order || "",
    studyNoteIds: studyNoteIds || "",
    scores: scores || "",
    limit: limit || "",
  });

  return (
    <StudyModeComponentBlock>
      <BasicHeader>
        <button
          className="answer-mode-router-back-button"
          onClick={router.back}
        >
          <LeftOutlined />
          <span>뒤로</span>
        </button>
        <h1 className="answer-mode-title">암기노트제목</h1>
        <Button type="primary">모드 변경</Button>
      </BasicHeader>
      <BasicBody>
        {mode === StudyMode.ANSWER && studyCards && (
          <AnswerModeComponent studyCards={studyCards} />
        )}
        {mode === StudyMode.CARD && studyCards && <CardModeComponent />}
        {mode === StudyMode.TYPYING && studyCards && <TypingModeComponent />}
      </BasicBody>
    </StudyModeComponentBlock>
  );
};

export default StudyModeComponent;
