import axiosClient from "./axiosClient";

export const uploadImage = (data: FormData) =>
  axiosClient.post("/upload", data);
