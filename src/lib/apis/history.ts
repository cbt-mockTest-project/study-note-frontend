import { CoreResponse } from "@/types/common";
import axiosClient from "./axiosClient";
import { IStudySetting } from "@/types/history";

export interface SaveHistoryInput {
  studySetting: IStudySetting;
}
export interface SaveHistoryResponse extends CoreResponse {}

export const saveHistoryAPI = (saveHistoryInput: SaveHistoryInput) =>
  axiosClient.post<SaveHistoryResponse>("/history", saveHistoryInput);
