import React from "react";
import styled from "styled-components";

const MyStorageComponentBlock = styled.div``;

interface MyStorageComponentProps {}

const MyStorageComponent: React.FC<MyStorageComponentProps> = () => {
  return <MyStorageComponentBlock>MyNote</MyStorageComponentBlock>;
};

export default MyStorageComponent;
