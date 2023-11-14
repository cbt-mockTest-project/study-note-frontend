import { CoreResponse } from "@/types/common";
import axiosClient from "./axiosClient";
import { IStudyNote } from "@/types/studyNote";

interface CreateStudyNotesResponse extends CoreResponse {
  studyNotes: IStudyNote[];
}

export const getMyStudyNotesAPI = () =>
  axiosClient.get<CreateStudyNotesResponse>("/study-note/me");

export interface PatchStudyNoteInput {
  studyCardOrder?: number[];
  name?: string;
}

export const patchStudyNoteAPI = (
  studyNoteId: string,
  data: PatchStudyNoteInput
) =>
  axiosClient.patch<CreateStudyNotesResponse>(
    `/study-note/${studyNoteId}`,
    data
  );

interface AddStudyNoteToFolderInput {
  studyNoteId: number;
  folderId: number;
}

export const addStudyNoteToFolderAPI = (
  addStudyNoteToFolderInput: AddStudyNoteToFolderInput
) =>
  axiosClient.post<CoreResponse>(
    "/study-note/add-to-folder",
    addStudyNoteToFolderInput
  );

interface RemoveStudyNoteFromFolderInput {
  studyNoteId: number;
  folderId: number;
}

export const removeStudyNoteFromFolderAPI = (
  removeStudyNoteFromFolderInput: RemoveStudyNoteFromFolderInput
) =>
  axiosClient.post<CoreResponse>(
    "/study-note/remove-from-folder",
    removeStudyNoteFromFolderInput
  );
