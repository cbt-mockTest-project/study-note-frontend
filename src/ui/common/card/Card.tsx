import { colors } from "@/styles/colors";
import React from "react";
import styled from "styled-components";

const CardBlock = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 20px;
  list-style: none;
  border: 1px solid ${colors.gray_200};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  const { children, ...divProps } = props;
  return <CardBlock {...divProps}>{children}</CardBlock>;
};

export default Card;
