import { IHistory } from "./history";

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  history: IHistory;
}
