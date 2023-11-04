"use client";

import BasicContentLayout from "@/ui/layout/BasicContentLayout";
import SharedStorageComponent from "@/ui/shared-storage/SharedStorageComponent";

export default function Mynote() {
  return (
    <BasicContentLayout>
      <SharedStorageComponent />
    </BasicContentLayout>
  );
}
