import React from "react";
import styled from "styled-components";

const SharedStorageComponentBlock = styled.div``;

interface SharedStorageComponentProps {}

const SharedStorageComponent: React.FC<SharedStorageComponentProps> = () => {
  return (
    <SharedStorageComponentBlock>
      SharedStorageComponent
    </SharedStorageComponentBlock>
  );
};

export default SharedStorageComponent;
