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

export interface StudyCardsForStudyNote {
  question?: string;
  answer?: string;
  question_img?: string;
  answer_img?: string;
  id?: number;
  noteId?: number;
}

interface SaveStudyNoteInput {
  name: string;
  noteId?: number;
  studyCards: StudyCardsForStudyNote[];
}

interface SaveStudyNoteResponse extends CoreResponse {
  studyNote: IStudyNote;
}

export const saveStudyNoteAPI = (studyNoteInput: SaveStudyNoteInput) =>
  axiosClient.post<SaveStudyNoteResponse>("/study-note", studyNoteInput);
