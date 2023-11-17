import { IFolder, FolderAccess, FolderFilter } from "@/types/folder";
import axiosClient from "./axiosClient";
import { CoreResponse } from "@/types/common";
import { hasAccessToken } from "../utils/hasAcessToken";

interface GetFolderResponse extends CoreResponse {
  folder: IFolder;
}

export const getFolderAPI = (id: string) =>
  axiosClient.get<GetFolderResponse>(`/folder/${id}`);

interface GetFoldersResponse extends CoreResponse {
  folders: IFolder[];
  ok: boolean;
  error?: string;
}

export const getFoldersAPI = (filter: FolderFilter) => {
  if (!hasAccessToken) return;
  return axiosClient.get<GetFoldersResponse>("/folder", { params: { filter } });
};

interface CreateFoldersResponse extends CoreResponse {
  folder: IFolder;
  ok: boolean;
  error?: string;
}

export interface CreateFolderInput {
  name: string;
  access: FolderAccess;
  description?: string;
}

export const createFolderAPI = (createFolderInput: CreateFolderInput) =>
  axiosClient.post<CreateFoldersResponse>("/folder", createFolderInput);

export const deleteFolderAPI = (id: string) =>
  axiosClient.delete<CoreResponse>(`/folder/${id}`);

export interface PatchFolderInput {
  name?: string;
  access?: FolderAccess;
  description?: string;
}

export const patchFolderAPI = (
  id: string,
  updateFolderInput: PatchFolderInput
) => axiosClient.patch<CoreResponse>(`/folder/${id}`, updateFolderInput);
