import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface DragDropContextWrapperProps {
  form: any[];
  setForm: (form: any[]) => void;
  droppableId: string;
  children: React.ReactNode;
}

const DragDropContextWrapper: React.FC<DragDropContextWrapperProps> = ({
  form,
  setForm,
  droppableId,
  children,
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const reorderedItems = Array.from(form);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setForm(reorderedItems);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropContextWrapper;
