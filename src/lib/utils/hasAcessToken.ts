import { getCookie } from "cookies-next";

export const hasAccessToken = () => !!getCookie("accessToken");
