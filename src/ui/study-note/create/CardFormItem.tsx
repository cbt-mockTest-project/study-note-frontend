import React from "react";
import styled from "styled-components";
import CardFormEditor from "./CardFormEditor";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "@/styles/colors";
import { breakpoint } from "@/lib/responsive";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { ChangeCardArgs } from "./CardFormList";
import { StudyCardsForStudyNote } from "@/lib/apis/studyNote";

const CardFormItemBlock = styled.div`
  .card-form-item-number {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: 52px;
  }
  .card-form-editor-wrapper {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .editor-uploader-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ant-upload.ant-upload-select,
  .ant-upload-list-item,
  .ant-upload-wrapper,
  .ant-upload-list-item-container {
    width: 65px !important;
    height: 65px !important;
  }
  .card-form-item-header {
    display: flex;
    justify-content: space-between;
  }
  .card-form-item-delete-handler {
    cursor: pointer;
  }
  .card-form-item-drag-handler {
    cursor: grab;
  }
  .card-form-item-header-button-wrapper {
    color: ${colors.gray_500};
    position: relative;
    bottom: 10px;
    display: flex;
    gap: 5px;
  }
  @media (max-width: ${breakpoint.lg}) {
    .card-form-editor-wrapper {
      flex-direction: column;
    }
  }
`;

interface CardFormItemProps {
  index: number;
  removeCard: () => void;
  deleteButtonVisible: boolean;
  card: StudyCardsForStudyNote;
  onChangeCard: (args: ChangeCardArgs) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const CardFormItem: React.FC<CardFormItemProps> = ({
  removeCard,
  dragHandleProps,
  onChangeCard,
  index,
  card,
  deleteButtonVisible = true,
}) => {
  return (
    <CardFormItemBlock>
      <div className="card-form-item-header">
        <p className="card-form-item-number">{index + 1}번</p>
        <div className="card-form-item-header-button-wrapper">
          <div className="card-form-item-drag-handler" {...dragHandleProps}>
            <DragIndicatorIcon />
          </div>
          {deleteButtonVisible && (
            <div
              className="card-form-item-delete-handler"
              role="button"
              onClick={removeCard}
            >
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
      <div className="card-form-editor-wrapper">
        <CardFormEditor
          text={card.question}
          imgUrl={card.question_img}
          onChangeImage={(value) => {
            onChangeCard({ question_img: value, index });
          }}
          onChangeText={(value) => {
            onChangeCard({ question: value, index });
          }}
          editorPlaceholder="문제를 입력해주세요."
        />
        <CardFormEditor
          text={card.answer}
          imgUrl={card.answer_img}
          onChangeImage={(value) => {
            onChangeCard({ answer_img: value, index });
          }}
          onChangeText={(value) => {
            onChangeCard({ answer: value, index });
          }}
          editorPlaceholder="정답을 입력해주세요."
        />
      </div>
    </CardFormItemBlock>
  );
};

export default CardFormItem;
