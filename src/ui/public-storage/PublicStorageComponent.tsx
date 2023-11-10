"use client";

import React from "react";
import styled from "styled-components";
import BasicContentLayout from "../layout/BasicContentLayout";

const PublicStorageComponentBlock = styled.div``;

interface PublicStorageComponentProps {}

const PublicStorageComponent: React.FC<PublicStorageComponentProps> = () => {
  return (
    <BasicContentLayout>
      <PublicStorageComponentBlock>
        PublicStorageComponent
      </PublicStorageComponentBlock>
    </BasicContentLayout>
  );
};

export default PublicStorageComponent;
