import React from "react";
import styled from "styled-components";

const MyNoteComponentBlock = styled.div``;

interface MyNoteComponentProps {}

const MyNoteComponent: React.FC<MyNoteComponentProps> = () => {
  return <MyNoteComponentBlock>MyNote</MyNoteComponentBlock>;
};

export default MyNoteComponent;
