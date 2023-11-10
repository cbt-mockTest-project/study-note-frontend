"use client";

import React, { useState } from "react";
import styled from "styled-components";
import BasicContentLayout from "../layout/BasicContentLayout";

const FolderComponentBlock = styled.div``;

interface FolderComponentProps {}

const FolderComponent: React.FC<FolderComponentProps> = () => {
  const [folder, setFolder] = useState(null);
  return (
    <BasicContentLayout>
      <FolderComponentBlock>
        {/* 컴포넌트의 내용을 여기에 작성하세요. */}
      </FolderComponentBlock>
    </BasicContentLayout>
  );
};

export default FolderComponent;
