import {
  SaveStudyNoteInput,
  StudyCardsForStudyNote,
} from "@/lib/apis/studyNote";
import DragDropContextWrapper from "@/ui/common/dragAndDrop/DragDropContextWrapper";
import React, { useCallback } from "react";
import styled from "styled-components";
import CardFormItem from "./CardFormItem";
import { Draggable } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";

const CardFormListBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export interface ChangeCardArgs {
  index: number;
  question?: string;
  answer?: string;
  question_img?: string;
  answer_img?: string;
}

interface CardFormListProps {
  studyNoteForm: SaveStudyNoteInput;
  setStudyCards: (cards: StudyCardsForStudyNote[]) => void;
  removeCard: (index: number) => void;
  removeCardLoading: boolean;
}

const CardFormList: React.FC<CardFormListProps> = ({
  studyNoteForm,
  setStudyCards,
  removeCard,
  removeCardLoading,
}) => {
  const onChangeCard = useCallback(
    (args: ChangeCardArgs) => {
      if (removeCardLoading) return;
      const { index, question, answer, question_img, answer_img } = args;
      const newStudyCards = cloneDeep(studyNoteForm.studyCards);
      if (question_img) newStudyCards[index]["question_img"] = question_img;
      if (answer_img) newStudyCards[index]["answer_img"] = answer_img;
      if (answer) newStudyCards[index]["answer"] = answer;
      if (question) newStudyCards[index]["question"] = question;
      setStudyCards(newStudyCards);
    },
    [removeCardLoading, studyNoteForm]
  );
  return (
    <DragDropContextWrapper
      form={studyNoteForm.studyCards}
      setForm={setStudyCards}
      droppableId="study-card-droppable"
    >
      <CardFormListBlock>
        {studyNoteForm.studyCards.map((card, index) => {
          return (
            <Draggable index={index} key={index} draggableId={index + ""}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="card-form-reorder-item"
                  {...provided.draggableProps}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                >
                  <CardFormItem
                    index={index}
                    card={card}
                    onChangeCard={onChangeCard}
                    removeCard={() => removeCard(card.id || 0)}
                    dragHandleProps={provided.dragHandleProps}
                    deleteButtonVisible={studyNoteForm.studyCards.length > 1}
                  />
                </div>
              )}
            </Draggable>
          );
        })}
      </CardFormListBlock>
    </DragDropContextWrapper>
  );
};

export default CardFormList;
