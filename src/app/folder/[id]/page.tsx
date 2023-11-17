import FolderComponent from "@/ui/folder/FolderComponent";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <FolderComponent id={id} />;
}
