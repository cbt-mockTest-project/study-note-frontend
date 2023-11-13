"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicContentLayout from "../../layout/BasicContentLayout";
import Image from "next/image";
import useMe from "@/lib/hooks/useMe";
import { Button, Upload, UploadProps, message } from "antd";
import { colors } from "@/styles/colors";
import { uploadImage } from "@/lib/apis/upload";
import { patchUser } from "@/lib/apis/user";
import SkeletonBox from "@/ui/common/skeleton/SkeletonBox";

const UserSettingComponentBlock = styled.div`
  .user-setting-label {
    font-size: 18px;
    font-weight: bold;
  }
  .user-setting-image-wrapper {
    margin-top: 15px;
    display: flex;
    gap: 15px;
  }

  .user-setting-profile-image {
    border-radius: 50%;
    object-fit: contain;
    background-color: ${colors.gray_50};
  }
  .user-setting-image-control-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .user-setting-image-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .user-setting-image-control-box-guide {
    color: ${colors.gray_500};
  }
`;

interface UserSettingComponentProps {}

const UserSettingComponent: React.FC<UserSettingComponentProps> = () => {
  const { me, isLoadingMe } = useMe();
  const [profileImage, setProfileImage] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const defaultProfileImage =
    process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE || "";

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    beforeUpload: (file) => {
      setUploading(true);
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("jpg, png, jpeg 파일만 업로드 가능합니다.");
      }
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error("1MB 이하의 파일만 업로드 가능합니다.");
      }
      return isJpgOrPng && isLt1M;
    },
    customRequest: async (options) => {
      try {
        if (!me?.data.ok) return message.error("로그인이 필요합니다.");
        const form = new FormData();
        form.append("file", options.file);
        form.append("path", "user");
        const { data: imageData } = await uploadImage(form);
        const { data: userData } = await patchUser({
          id: me.data.user.id,
          body: { picture: imageData.url },
        });
        if (userData.error) return message.error(userData.error);
        setProfileImage(imageData.url);
      } catch (e) {
        message.error("파일 업로드에 실패했습니다.");
        console.log(e);
      } finally {
        setUploading(false);
      }
    },
  };

  const setDefaultProfileImage = async () => {
    try {
      if (!me?.data.ok) return message.error("로그인이 필요합니다.");
      const { data } = await patchUser({
        id: me.data.user.id,
        body: { picture: defaultProfileImage },
      });
      if (data.error) return message.error(data.error);
      setProfileImage(defaultProfileImage);
    } catch (e) {
      message.error("프로필 이미지를 삭제하는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!me?.data) return;
    if (me.data.user.picture) setProfileImage(me.data.user.picture);
    else setProfileImage(defaultProfileImage);
  }, [me]);

  if (isLoadingMe || !me) return <div>로딩중...</div>;

  return (
    <BasicContentLayout>
      <UserSettingComponentBlock>
        <p className="user-setting-label">프로필 이미지</p>
        <div className="user-setting-image-wrapper">
          {profileImage ? (
            <Image
              className="user-setting-profile-image"
              src={profileImage}
              alt="프로필 이미지"
              width={100}
              height={100}
            />
          ) : (
            <SkeletonBox radius="50%" width="100px" height="100px" />
          )}
          <div className="user-setting-image-control-box">
            <div className="user-setting-image-button-wrapper">
              <Upload {...uploadProps}>
                <Button type="primary" loading={uploading}>
                  변경
                </Button>
              </Upload>
              {profileImage && profileImage !== defaultProfileImage && (
                <Button onClick={setDefaultProfileImage}>삭제</Button>
              )}
            </div>
            <p className="user-setting-image-control-box-guide">
              확장자: png, jpg, jpeg / 용량 1MB 이하
            </p>
          </div>
        </div>
      </UserSettingComponentBlock>
    </BasicContentLayout>
  );
};

export default UserSettingComponent;
