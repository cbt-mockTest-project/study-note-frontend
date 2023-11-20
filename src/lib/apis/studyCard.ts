import { CoreResponse } from "@/types/common";
import axiosClient from "./axiosClient";
import { IStudyCard } from "@/types/studyCard";
import { addQueryParams } from "../utils/addQueryParams";

interface GetStudyCardsFromNoteIdsResponse extends CoreResponse {
  studyCards: IStudyCard[];
}

export interface GetStudyCardsFromNoteIdsInput {
  studyNoteIds: string;
  limit?: string;
  order?: string;
  scores?: string;
}

export const getStudyCardsFromNoteIdsAPI = (
  getStudyCardsFromNoteIdsInput: GetStudyCardsFromNoteIdsInput
) =>
  axiosClient.get<GetStudyCardsFromNoteIdsResponse>(
    addQueryParams("/study-card", { ...getStudyCardsFromNoteIdsInput })
  );
