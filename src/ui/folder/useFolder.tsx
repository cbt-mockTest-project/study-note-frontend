import { getFolderAPI } from "@/lib/apis/folder";
import { IFolder } from "@/types/folder";
import { IStudyNote } from "@/types/studyNote";
import useSWR from "swr";

const useFolder = (id: string) => {
  const {
    data,
    mutate: mutateFolder,
    isLoading: isLoadingFolder,
  } = useSWR(["/folder:id", id], () => getFolderAPI(id));
  const setFolder = (folder: IFolder) => {
    if (!data) return;
    mutateFolder({
      ...data,
      data: {
        ...data.data,
        folder,
      },
    });
  };
  const setNotes = (studyNotes: IStudyNote[]) => {
    if (!data) return;
    mutateFolder({
      ...data,
      data: {
        ...data.data,
        folder: {
          ...data.data.folder,
          studyNotes,
        },
      },
    });
  };
  return {
    folder: data?.data.folder,
    setFolder,
    setNotes,
    isLoadingFolder,
  };
};

export default useFolder;
