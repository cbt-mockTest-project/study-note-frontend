import { StudyMode, StudyOrder } from "./folder";
import { CardScoreLevel } from "./studyCard";

export interface IStudySetting {
  folderId: number;
  studyNoteIds: number[];
  order?: StudyOrder;
  mode: StudyMode;
  limit: number | null;
  scores: CardScoreLevel[];
}

export interface IHistory {
  studySettings: IStudySetting[];
}
