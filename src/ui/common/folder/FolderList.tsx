import React from "react";
import styled from "styled-components";
import FolderItem from "./FolderItem";
import { IFolder } from "@/types/folder";
import SkeletonBox from "../skeleton/SkeletonBox";

import Link from "next/link";

const FolderListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .folder-list-item-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: calc(100vh - 200px);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .folder-list-item-link {
    color: black;
  }
`;

interface FolderListProps {
  folders: IFolder[];
  getFoldersLoading: boolean;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  getFoldersLoading,
}) => {
  return (
    <FolderListBlock>
      <div className="folder-list-item-wrapper">
        {!getFoldersLoading &&
          folders.map((folder) => (
            <Link
              className="folder-list-item-link"
              key={folder.id}
              href={`/folder/${folder.id}`}
            >
              <li>
                <FolderItem {...folder} />
              </li>
            </Link>
          ))}
      </div>
      {getFoldersLoading &&
        [1, 2, 3, 4].map((el) => (
          <SkeletonBox key={el} width="100%" height="45px" radius="10px" />
        ))}
    </FolderListBlock>
  );
};

export default FolderList;
