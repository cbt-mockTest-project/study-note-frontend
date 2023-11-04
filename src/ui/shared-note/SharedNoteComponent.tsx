import React from "react";
import styled from "styled-components";

const SharedNoteComponentBlock = styled.div``;

interface SharedNoteComponentProps {}

const SharedNoteComponent: React.FC<SharedNoteComponentProps> = () => {
  return (
    <SharedNoteComponentBlock>SharedNoteComponent</SharedNoteComponentBlock>
  );
};

export default SharedNoteComponent;
