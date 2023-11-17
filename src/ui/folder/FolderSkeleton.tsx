import React from "react";
import BasicContentLayout from "../layout/BasicContentLayout";
import SkeletonBox from "../common/skeleton/SkeletonBox";

interface FolderSkeletonmProps {}

const FolderSkeleton: React.FC<FolderSkeletonmProps> = () => {
  return (
    <BasicContentLayout>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <SkeletonBox height="25px" width="35%" />
      </div>
      <SkeletonBox height="20px" width="40%" />
      <div style={{ marginTop: "10px" }}>
        <SkeletonBox height="14px" width="45%" />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <SkeletonBox key={item} width="calc(50% - 5px)" height="79px" />
        ))}
      </div>
    </BasicContentLayout>
  );
};

export default FolderSkeleton;
