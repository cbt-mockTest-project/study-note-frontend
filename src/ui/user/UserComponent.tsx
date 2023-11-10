"use client";

import React from "react";
import styled from "styled-components";
import BasicContentLayout from "../layout/BasicContentLayout";

const UserComponentBlock = styled.div``;

interface UserComponentProps {}

const UserComponent: React.FC<UserComponentProps> = () => {
  return (
    <BasicContentLayout>
      <UserComponentBlock>UserComponent</UserComponentBlock>
    </BasicContentLayout>
  );
};

export default UserComponent;
