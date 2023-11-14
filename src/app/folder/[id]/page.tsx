import FolderComponent from "@/ui/folder/FolderComponent";
import { Suspense } from "react";

const getFolder = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/folder/${id}`);
  if (res.ok) {
    return res.json();
  }
  return new Error("Failed to fetch data");
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getFolder(id);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FolderComponent folder={data.folder} />
    </Suspense>
  );
}
