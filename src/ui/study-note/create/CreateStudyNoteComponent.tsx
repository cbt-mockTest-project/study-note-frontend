"use client";

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { StudyCardsForStudyNote } from "@/lib/apis/studyNote";
import dynamic from "next/dynamic";
import SkeletonBox from "@/ui/common/skeleton/SkeletonBox";
import { uniqueId } from "lodash";

const CardFormList = dynamic(() => import("./CardFormList"), {
  ssr: false,
  loading: () => (
    <>
      <SkeletonBox width="100%" height="30px" />
      <SkeletonBox width="100%" height="30px" />
      <SkeletonBox width="100%" height="30px" />
    </>
  ),
});
const CreateStudyNoteComponentBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  height: 100vh;
  .create-study-note-header {
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    border-bottom: 1px solid ${colors.gray_300};
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
    background-color: ${colors.white};
    z-index: 1;
  }
  .create-study-note-title-input {
    font-size: 20px;
    font-weight: bold;
    color: ${colors.gray_900};
    margin-bottom: 20px;
    border-radius: 0px;
    border-bottom: 1px solid ${colors.gray_300};
    &:hover,
    &:focus,
    &:active {
      border-bottom: 1px solid ${colors.gray_300};
    }
  }
  .create-study-note-header-inner {
    padding: 10px 20px;
    max-width: 1280px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
  .create-study-note-body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0px 20px 20px 20px;
  }
  .create-study-note-title {
    font-size: 20px;
    font-weight: bold;
    color: ${colors.gray_900};
  }

  .card-form-reorder-item {
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 20px;
    list-style: none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  .card-form-add-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: auto;
    border-radius: 10px;
    gap: 10px;
    color: ${colors.gray_500};
    font-size: 14px;
    font-weight: bold;
  }
`;

interface CreateStudyNoteComponentProps {}

const CreateStudyNoteComponent: React.FC<
  CreateStudyNoteComponentProps
> = () => {
  const [studyCards, setStudyCards] = useState<StudyCardsForStudyNote[]>([
    {
      id: -uniqueId(),
    },
  ]);
  const addCard = () => {
    setStudyCards((prev) => [...prev, { id: -uniqueId() }]);
  };
  const removeCard = (id: number) => {
    setStudyCards((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <CreateStudyNoteComponentBlock>
      <div className="create-study-note-header">
        <div className="create-study-note-header-inner">
          <h1 className="create-study-note-title">암기장 만들기</h1>
          <Button type="primary">저장</Button>
        </div>
      </div>
      <div className="create-study-note-body">
        <Input
          className="create-study-note-title-input"
          bordered={false}
          placeholder="제목을 입력해주세요."
        />
        <CardFormList
          studyCards={studyCards}
          setStudyCards={setStudyCards}
          removeCard={removeCard}
        />
        <Button
          className="card-form-add-button-wrapper"
          type="dashed"
          size="large"
          onClick={addCard}
        >
          <PlusOutlined />
          <span>카드 추가</span>
        </Button>
      </div>
    </CreateStudyNoteComponentBlock>
  );
};

export default CreateStudyNoteComponent;
