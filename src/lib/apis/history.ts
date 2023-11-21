import { CardScoreLevel } from "@/types/studyCard";
import axiosClient from "./axiosClient";

export interface ISelectedNoteIds {
  folderId: number;
  noteIds: number[];
}

export interface IStudySetting {
  scores?: CardScoreLevel[];
  order?: "random" | "normal";
  limit?: number | null;
}

export interface SaveHistoryInput {
  selectedNoteIds?: ISelectedNoteIds;
  studySetting?: IStudySetting;
}

export const saveHistoryAPI = (saveHistoryInput: SaveHistoryInput) =>
  axiosClient.post("/history", saveHistoryInput);
