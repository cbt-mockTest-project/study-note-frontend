import { CoreResponse } from "@/types/common";
import axiosClient from "./axiosClient";
import { IStudyCard } from "@/types/studyCard";
import { addQueryParams } from "../utils/addQueryParams";

interface GetStudyCardsFromNoteIdsResponse extends CoreResponse {
  studyCards: IStudyCard[];
}

interface GetStudyCardsFromNoteIdsInput {
  studyNoteIds: string;
  limit: string;
  mode?: string;
  scores?: string;
}

export const GetStudyCardsFromNoteIdsAPI = (
  getStudyCardsFromNoteIdsInput: GetStudyCardsFromNoteIdsInput
) =>
  axiosClient.get<GetStudyCardsFromNoteIdsResponse>(
    addQueryParams("/study-card", { ...getStudyCardsFromNoteIdsInput })
  );
