import NoteWriteComponent from "@/ui/my-notes/write/NoteWriteComponent";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoteWriteComponent />
    </Suspense>
  );
}
