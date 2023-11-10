"use client";

import React from "react";
import styled from "styled-components";
import BasicContentLayout from "../layout/BasicContentLayout";

const SharedStorageComponentBlock = styled.div``;

interface SharedStorageComponentProps {}

const SharedStorageComponent: React.FC<SharedStorageComponentProps> = () => {
  return (
    <BasicContentLayout>
      <SharedStorageComponentBlock>
        SharedStorageComponent
      </SharedStorageComponentBlock>
    </BasicContentLayout>
  );
};

export default SharedStorageComponent;
