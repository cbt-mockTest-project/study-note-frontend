import { getMyStudyNotesAPI } from "@/lib/apis/studyNote";
import { IStudyNote } from "@/types/studyNote";
import useSWR from "swr";

const useMyStudyNotes = () => {
  const {
    data: myStudyNotesResponse,
    mutate: mutateMyStudyNotes,
    isLoading: getMyStudyNotesLoading,
  } = useSWR("/study-note/me", getMyStudyNotesAPI);

  return {
    myStudyNotes: myStudyNotesResponse?.data.studyNotes || [],
    mutateMyStudyNotes,
    getMyStudyNotesLoading,
  };
};

export default useMyStudyNotes;
