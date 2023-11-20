import { StudyMode } from "@/types/folder";
import StudyModeComponent from "@/ui/study-mode/StudyModeComponent";

export default async function Page({
  params: { mode },
}: {
  params: { mode: StudyMode };
}) {
  return <StudyModeComponent mode={mode} />;
}
