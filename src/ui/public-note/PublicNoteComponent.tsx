import React from "react";
import styled from "styled-components";

const PublicNoteComponentBlock = styled.div``;

interface PublicNoteComponentProps {}

const PublicNoteComponent: React.FC<PublicNoteComponentProps> = () => {
  return (
    <PublicNoteComponentBlock>PublicNoteComponent</PublicNoteComponentBlock>
  );
};

export default PublicNoteComponent;
