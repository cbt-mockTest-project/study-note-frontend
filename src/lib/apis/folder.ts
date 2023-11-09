import { Folder, FolderAccess, FolderFilter } from "@/types/folder";
import axiosClient from "./axiosClient";
import { CoreResponse } from "@/types/common";

interface GetFoldersResponse extends CoreResponse {
  folders: Folder[];
  ok: boolean;
  error?: string;
}

export const getFolders = (filter: FolderFilter) =>
  axiosClient.get<GetFoldersResponse>("/folder", { params: { filter } });

interface CreateFoldersResponse extends CoreResponse {
  folder: Folder;
  ok: boolean;
  error?: string;
}

export interface CreateFolderInput {
  name: string;
  access: FolderAccess;
  description?: string;
}

export const createFolder = (createFolderInput: CreateFolderInput) =>
  axiosClient.post<CreateFoldersResponse>("/folder", createFolderInput);
