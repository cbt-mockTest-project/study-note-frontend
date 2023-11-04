"use client";
import { Button } from "antd";
import styled from "styled-components";

export default function Home() {
  console.log("his");
  return (
    <>
      <Button>asd</Button>
      {/* <Test>as</Test> */}
      <button>as</button>
      <input />
    </>
  );
}

const Test = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
