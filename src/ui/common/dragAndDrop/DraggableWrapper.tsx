import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface DraggableWrapperProps {
  children?: React.ReactNode;
  index: number;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  index,
}) => {
  return (
    <Draggable key={index} index={index} draggableId={index + ""}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableWrapper;
