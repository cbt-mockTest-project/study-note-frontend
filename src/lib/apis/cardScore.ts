import { CoreResponse } from "@/types/common";
import axiosClient from "./axiosClient";
import { CardScoreLevel } from "@/types/studyCard";

interface PostCardScoreResponse extends CoreResponse {}

interface PostCardScoreInput {
  id: number;
  body: {
    score: CardScoreLevel;
  };
}

export const postCardScoreAPI = (postCardScoreInput: PostCardScoreInput) =>
  axiosClient.post<PostCardScoreResponse>(
    `/card-score/${postCardScoreInput.id}`,
    postCardScoreInput.body
  );
