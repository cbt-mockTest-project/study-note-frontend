import { CreateFolderInput, createFolder, getFolders } from "@/lib/apis/folder";
import { FolderFilter } from "@/types/folder";
import { message } from "antd";
import { cloneDeep } from "lodash";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";

const useFolders = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") as FolderFilter;

  const {
    data: getFoldersResponse,
    mutate: mutateFolders,
    isLoading: isLoadingFolders,
  } = useSWR(["/folder", filter], () => getFolders(filter));

  const folders = useMemo(
    () => getFoldersResponse?.data.folders || [],
    [getFoldersResponse]
  );

  const handleCreateFolder = async (createFolderInput: CreateFolderInput) => {
    try {
      const { data } = await createFolder(createFolderInput);
      if (data.ok) {
        const copiedResponse = cloneDeep(getFoldersResponse);
        if (!copiedResponse?.data.folders) return;
        copiedResponse.data.folders.unshift(data.folder);
        return mutateFolders(copiedResponse, false);
      }
      message.error(data.error);
    } catch (e) {
      message.error("폴더를 생성할 수 없습니다.");
    }
  };
  return {
    handleCreateFolder,
    folders,
    isLoadingFolders,
  };
};

export default useFolders;
