export interface IStudyNote {
  id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  studyCardOrder: number[];
}