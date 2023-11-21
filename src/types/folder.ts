import { IStudyNote } from "./studyNote";
import { IUser } from "./user";

export interface IFolder {
  id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  access: FolderAccess;
  description: string;
  user: IUser;
  folderBookmarks: { id: number }[];
  folderLikes: { id: number }[];
  studyNotes: IStudyNote[];
}

export enum FolderAccess {
  PUBLIC = "public",
  SECRET = "secret",
}
export enum FolderFilter {
  BOOKMARK = "bookmark",
  ME = "me",
}

export enum StudyMode {
  CARD = "card",
  ANSWER = "answer",
  TYPYING = "typing",
}
