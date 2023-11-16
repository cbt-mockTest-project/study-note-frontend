import axiosClient from "./axiosClient";

export const uploadImageAPI = (data: FormData) =>
  axiosClient.post("/upload", data);
