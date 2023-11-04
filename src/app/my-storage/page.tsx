"use client";

import BasicContentLayout from "@/ui/layout/BasicContentLayout";
import MyStorageComponent from "@/ui/my-storage/MyStorageComponent";

export default function Mynote() {
  return (
    <BasicContentLayout pathList={["내 암기장"]}>
      <MyStorageComponent />
    </BasicContentLayout>
  );
}
