export interface IStudyCard {
  id: number;
  created_at: string;
  updated_at: string;
  question: string;
  answer: string;
  question_img: string;
  answer_img: string;
  myScore: CardScoreLevel | null;
}

export enum CardScoreLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  NONE = "NONE",
}
