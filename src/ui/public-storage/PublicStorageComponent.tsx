import React from "react";
import styled from "styled-components";

const PublicStorageComponentBlock = styled.div``;

interface PublicStorageComponentProps {}

const PublicStorageComponent: React.FC<PublicStorageComponentProps> = () => {
  return (
    <PublicStorageComponentBlock>
      PublicStorageComponent
    </PublicStorageComponentBlock>
  );
};

export default PublicStorageComponent;
