"use client";
import BasicContentLayout from "@/ui/layout/BasicContentLayout";
import { Button } from "antd";
import styled from "styled-components";

export default function Home() {
  return (
    <BasicContentLayout>
      <Button>asd</Button>
      <button>as</button>
    </BasicContentLayout>
  );
}

const Test = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
