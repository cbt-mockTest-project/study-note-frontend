import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>my-notes</div>
    </Suspense>
  );
}
