import { User } from "@/types/user";
import axiosClient from "./axiosClient";

interface GetUserInfoResponse {
  user: User;
  ok: boolean;
  error?: string;
}

export const getUserInfo = () =>
  axiosClient.get<GetUserInfoResponse>("/user/me");

export const logout = () => axiosClient.post("/user/logout");
