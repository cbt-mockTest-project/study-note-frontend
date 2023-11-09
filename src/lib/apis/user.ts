import { User } from "@/types/user";
import axiosClient from "./axiosClient";
import { CoreResponse } from "@/types/common";

interface GetUserInfoResponse extends CoreResponse {
  user: User;
}

export const getUserInfo = () =>
  axiosClient.get<GetUserInfoResponse>("/user/me");

export const logout = () => axiosClient.post("/user/logout");
