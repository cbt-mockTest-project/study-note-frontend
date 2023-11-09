import { colors } from "@/styles/colors";
import React from "react";
import styled from "styled-components";

const SkeletonBoxBlock = styled.div<SkeletonBoxProps>`
  border-radius: ${({ radius }) => radius};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${colors.gray_200};
  margin-bottom: 5px;
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

interface SkeletonBoxProps {
  width?: string;
  height?: string;
  radius?: string;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = "100%",
  height = "20px",
  radius = "5px",
}) => {
  return <SkeletonBoxBlock width={width} height={height} radius={radius} />;
};

export default SkeletonBox;
