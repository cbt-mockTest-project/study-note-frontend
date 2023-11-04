"use client";

import BasicContentLayout from "@/ui/layout/BasicContentLayout";
import MyNoteComponent from "@/ui/my-note/MynoteComponent";
import PublicNoteComponent from "@/ui/public-note/PublicNoteComponent";

export default function Mynote() {
  return (
    <BasicContentLayout>
      <PublicNoteComponent />
    </BasicContentLayout>
  );
}
