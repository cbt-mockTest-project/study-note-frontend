"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { Button, Input, InputRef, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  SaveStudyNoteInput,
  StudyCardsForStudyNote,
  getStudyNoteForEditAPI,
  saveStudyNoteAPI,
} from "@/lib/apis/studyNote";
import dynamic from "next/dynamic";
import SkeletonBox from "@/ui/common/skeleton/SkeletonBox";
import { cloneDeep, isEqual, uniqueId } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { removeHtmlTag } from "@/lib/utils/removeHtmlTag";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import BasicHeader from "@/ui/layout/BasicHeader";
import BasicBody from "@/ui/layout/BasicBody";

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
  .create-study-note-prev-folder-link {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.gray_900};
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .create-study-note-updated-at {
    font-size: 12px;
    color: ${colors.gray_500};
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

  .create-study-note-title {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.gray_900};
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
  const DEFAULT_STUDY_NOTE = {
    id: -uniqueId(),
    question: "",
    answer: "",
    question_img: "",
    answer_img: "",
  };
  const removeCardLoading = useRef<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const nameRef = React.useRef<InputRef>(null);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const folderId = params.get("fid");
  const noteId = params.get("nid");
  const DEFAULT_STUDY_NOTE_FORM = {
    name: "",
    studyCards: [DEFAULT_STUDY_NOTE],
    folderId: Number(folderId),
  };
  const [studyNoteForm, setStudyNoteForm] = useState<SaveStudyNoteInput>(
    noteId
      ? {
          ...DEFAULT_STUDY_NOTE_FORM,
          noteId: Number(noteId),
        }
      : DEFAULT_STUDY_NOTE_FORM
  );

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyNoteForm({
      ...studyNoteForm,
      name: e.target.value,
    });
  };
  const addCard = () => {
    const clonedStudyNoteForm = cloneDeep(studyNoteForm);
    clonedStudyNoteForm.studyCards.push(DEFAULT_STUDY_NOTE);
    setStudyNoteForm(clonedStudyNoteForm);
  };
  const removeCard = (id: number) => {
    removeCardLoading.current = true;
    const clonedStudyNoteForm = cloneDeep(studyNoteForm);
    clonedStudyNoteForm.studyCards = clonedStudyNoteForm.studyCards.filter(
      (studyCard) => studyCard.id !== id
    );
    setStudyNoteForm(clonedStudyNoteForm);
    removeCardLoading.current = false;
  };
  const saveStudyNote = async () => {
    try {
      setSaveLoading(true);
      if (!studyNoteForm.name) {
        nameRef.current?.focus();
        message.error("제목을 입력해주세요.");
        return;
      }
      if (studyNoteForm.studyCards.length === 0) {
        message.error("카드를 추가해주세요.");
        return;
      }
      let filteredStudyCards = studyNoteForm.studyCards
        .filter(
          (studyCard) =>
            removeHtmlTag(studyCard.question) ||
            removeHtmlTag(studyCard.answer) ||
            studyCard.question_img ||
            studyCard.answer_img
        )
        .map((el) => {
          if (el.id && el.id < 0) {
            delete el.id;
            return el;
          }
          return el;
        });
      if (filteredStudyCards.length === 0) {
        message.error("카드를 1개 이상 등록해주세요.");
        return;
      }
      const { data } = await saveStudyNoteAPI({
        studyCards: filteredStudyCards,
        folderId: Number(folderId),
        name: studyNoteForm.name,
        noteId: studyNoteForm.noteId,
      });

      data.studyNote.studyCardOrder.forEach((id, index) => {
        filteredStudyCards[index].id = id;
      });

      setStudyNoteForm({
        ...studyNoteForm,
        noteId: data.studyNote.id,
        studyCards: filteredStudyCards,
      });
      if (!noteId) {
        router.replace(`${pathname}?fid=${folderId}&nid=${data.studyNote.id}`, {
          scroll: false,
        });
      }
      if (data.error) {
        return message.error(data.error);
      }
      message.success("저장되었습니다.");
    } catch (e) {
      message.error("알 수 없는 에러가 발생했습니다.");
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    // 노트 수정일 경우
    if (
      noteId &&
      isEqual(studyNoteForm, {
        ...DEFAULT_STUDY_NOTE_FORM,
        noteId: Number(noteId),
      })
    ) {
      getStudyNoteForEditAPI(noteId).then(({ data }) => {
        setStudyNoteForm({
          folderId: Number(folderId),
          noteId: data.studyNote.id,
          name: data.studyNote.name,
          studyCards: data.studyNote.studyCards,
        });
      });
    }
  }, [noteId]);

  return (
    <CreateStudyNoteComponentBlock>
      <BasicHeader className="create-study-note-header">
        <Link
          className="create-study-note-prev-folder-link"
          href={`/folder/${folderId}`}
        >
          <LeftOutlined />
          <span>폴더</span>
        </Link>
        <h1 className="create-study-note-title">암기장 만들기</h1>
        <Button type="primary" onClick={saveStudyNote} loading={saveLoading}>
          저장
        </Button>
      </BasicHeader>
      <BasicBody>
        <Input
          className="create-study-note-title-input"
          ref={nameRef}
          bordered={false}
          placeholder="제목을 입력해주세요."
          value={studyNoteForm.name}
          onChange={onChangeName}
        />
        <CardFormList
          studyNoteForm={studyNoteForm}
          setStudyCards={(value: StudyCardsForStudyNote[]) => {
            const clonedStudyNoteForm = cloneDeep(studyNoteForm);
            clonedStudyNoteForm.studyCards = value;
            setStudyNoteForm(clonedStudyNoteForm);
          }}
          removeCard={removeCard}
          removeCardLoading={removeCardLoading.current}
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
      </BasicBody>
    </CreateStudyNoteComponentBlock>
  );
};

export default CreateStudyNoteComponent;
