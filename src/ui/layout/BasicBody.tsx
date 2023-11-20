import React from "react";
import styled from "styled-components";

const BasicBodyBlock = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
`;

interface BasicBodyProps {
  children: React.ReactNode;
}

const BasicBody: React.FC<BasicBodyProps> = ({ children }) => {
  return <BasicBodyBlock>{children}</BasicBodyBlock>;
};

export default BasicBody;
