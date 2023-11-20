import {
  GetStudyCardsFromNoteIdsInput,
  getStudyCardsFromNoteIdsAPI,
} from "@/lib/apis/studyCard";
import useSWR from "swr";

const useStudyCards = (
  getStudyCardsFromNoteIdsInput: GetStudyCardsFromNoteIdsInput
) => {
  const {
    data,
    mutate: mutateStudyCards,
    isLoading: isLoadingStudyCards,
  } = useSWR(["/studyCards"], () =>
    getStudyCardsFromNoteIdsAPI(getStudyCardsFromNoteIdsInput)
  );

  return {
    studyCards: data?.data.studyCards,
    isLoadingStudyCards,
  };
};

export default useStudyCards;
