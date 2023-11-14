import {
  CreateFolderInput,
  createFolderAPI,
  getFoldersAPI,
} from "@/lib/apis/folder";
import useMe from "@/lib/hooks/useMe";
import { FolderFilter } from "@/types/folder";
import { message } from "antd";
import { cloneDeep } from "lodash";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";

const useFolders = () => {
  const searchParams = useSearchParams();
  const { me } = useMe();
  const filter = searchParams.get("filter") as FolderFilter;
  const [createFolderLoading, setCreateFolderLoading] = useState(false);
  const {
    data: getFoldersResponse,
    mutate: mutateFolders,
    isLoading: getFoldersLoading,
  } = useSWR(["/folder", filter], () =>
    me?.data.ok ? getFoldersAPI(filter) : Promise.resolve(null)
  );

  const folders = useMemo(
    () => getFoldersResponse?.data.folders || [],
    [getFoldersResponse]
  );

  const createFolder = async (createFolderInput: CreateFolderInput) => {
    try {
      setCreateFolderLoading(true);
      if (!createFolderInput.name) {
        message.error("폴더 이름을 입력해주세요.");
        return;
      }
      const { data } = await createFolderAPI(createFolderInput);
      if (data.ok) {
        const copiedResponse = cloneDeep(getFoldersResponse);
        if (!copiedResponse?.data.folders) return;
        copiedResponse.data.folders.unshift(data.folder);
        mutateFolders(copiedResponse, false);
        return;
      }
      message.error(data.error);
    } catch (e) {
      message.error("폴더를 생성할 수 없습니다.");
    } finally {
      setCreateFolderLoading(false);
    }
  };
  return {
    createFolder,
    createFolderLoading,
    folders,
    getFoldersLoading,
  };
};

export default useFolders;
