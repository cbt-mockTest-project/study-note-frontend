import { IStudyCard } from "./studyCard";
import { IUser } from "./user";

export interface IStudyNote {
  id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  studyCardOrder: number[];
  user: IUser;
  studyCards: IStudyCard[];
}
