import React from "react";
import styled from "styled-components";

const UserComponentBlock = styled.div``;

interface UserComponentProps {}

const UserComponent: React.FC<UserComponentProps> = () => {
  return <UserComponentBlock>UserComponent</UserComponentBlock>;
};

export default UserComponent;
