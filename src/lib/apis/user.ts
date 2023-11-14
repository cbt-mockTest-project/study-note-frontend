import { IUser } from "@/types/user";
import axiosClient from "./axiosClient";
import { CoreResponse } from "@/types/common";
import { hasAccessToken } from "../utils/hasAcessToken";

interface GetUserInfoResponse extends CoreResponse {
  user: IUser;
}

export const getUserInfo = () => {
  if (!hasAccessToken()) return;
  return axiosClient.get<GetUserInfoResponse>("/user/me");
};

export const logout = () => axiosClient.post("/user/logout");

export interface PatchUserInput {
  picture?: string;
  nickname?: string;
}

interface PatchUserResponse extends CoreResponse {}

export const patchUserAPI = (data: PatchUserInput) =>
  axiosClient.patch<PatchUserResponse>(`/user`, data);

export const deleteUserAPI = () => axiosClient.delete<CoreResponse>(`/user`);
