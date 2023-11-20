import { colors } from "@/styles/colors";
import React from "react";
import styled from "styled-components";

interface BasicHeaderBlockProps {
  justifyContent: string;
}

const BasicHeaderBlock = styled.div<BasicHeaderBlockProps>`
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${colors.gray_300};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: ${colors.white};
  z-index: 1;
  height: 55px;
  width: 100vw;
  .basic-header-inner {
    padding: 10px 20px;
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justifyContent};
    margin: 0 auto;
  }
`;

interface BasicHeaderProps {
  children?: React.ReactNode;
  className?: string;
  justifyContent?: string;
}

const BasicHeader: React.FC<BasicHeaderProps> = ({
  className = "",
  children,
  justifyContent = "space-between",
}) => {
  return (
    <BasicHeaderBlock className={className} justifyContent={justifyContent}>
      <div className="basic-header-inner">{children}</div>
    </BasicHeaderBlock>
  );
};

export default BasicHeader;
