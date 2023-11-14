"use client";

import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";

const NoteWriteComponentBlock = styled.div``;

const CustomEditor = dynamic(
  () => import("@/ui/common/editor/CustomEditor").then((mod) => mod.default),
  {
    ssr: false,
  }
);

interface NoteWriteComponentProps {}

const NoteWriteComponent: React.FC<NoteWriteComponentProps> = () => {
  return (
    <NoteWriteComponentBlock>
      <CustomEditor />
    </NoteWriteComponentBlock>
  );
};

export default NoteWriteComponent;
