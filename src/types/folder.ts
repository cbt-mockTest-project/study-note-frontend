export interface Folder {
  id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  access: FolderAccess;
}

export enum FolderAccess {
  PUBLIC = "public",
  SECRET = "secret",
}
export enum FolderFilter {
  BOOKMARK = "bookmark",
  ME = "me",
}
