"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicContentLayout from "../../layout/BasicContentLayout";
import Image from "next/image";
import useMe from "@/lib/hooks/useMe";
import { Button, Modal, Upload, UploadProps, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { colors } from "@/styles/colors";
import { uploadImageAPI } from "@/lib/apis/upload";
import { deleteUserAPI, logout, patchUserAPI } from "@/lib/apis/user";
import SkeletonBox from "@/ui/common/skeleton/SkeletonBox";
import InputWithError from "@/ui/common/input/InputWithError";
import { useRouter } from "next/navigation";

const UserSettingComponentBlock = styled.div`
  .user-setting-label {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.gray_700};
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
  .user-setting-update-nickname-wrapper {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }
  .user-setting-label-description {
    margin-top: 5px;
    color: ${colors.gray_500};
  }

  .user-setting-nickname-input-button-wrapper {
    margin-top: 10px;
    display: flex;
    gap: 5px;
    width: 100%;
    max-width: 350px;
  }
  .user-setting-nickname-input {
    width: 100%;
  }
  .user-setting-delete-account-wrapper {
    margin-top: 30px;
  }
  .user-setting-delete-info-toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    svg {
      transition: all 0.3s ease-in-out;
    }
  }
  .user-setting-delete-info-toggle-button.open {
    svg {
      transform: scaleY(-1);
    }
  }
  .user-setting-delete-account-guide-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: ${colors.gray_700};
    transition: all 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(-10px);
    visibility: hidden;
  }
  .user-setting-delete-account-guide-list.visible {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
  .user-setting-delete-button {
    margin-top: 10px;
    max-width: 150px;
  }
`;

interface UserSettingComponentProps {}

const UserSettingComponent: React.FC<UserSettingComponentProps> = () => {
  const { me, isLoadingMe } = useMe();
  const [profileImage, setProfileImage] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [isDeleteInfoVisible, setIsDeleteInfoVisible] =
    useState<boolean>(false);
  const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false);
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
        const { data: imageData } = await uploadImageAPI(form);
        const { data: userData } = await patchUserAPI({
          picture: imageData.url,
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
      const { data } = await patchUserAPI({ picture: defaultProfileImage });
      if (data.error) return message.error(data.error);
      setProfileImage(defaultProfileImage);
    } catch (e) {
      message.error("프로필 이미지를 삭제하는데 실패했습니다.");
    }
  };

  const onChangeNickname = (nickname: string) => {
    setNickname(nickname);
    if (nickname.length < 2)
      return setNicknameError("닉네임은 2글자 이상입니다.");
    if (nickname.length > 10)
      return setNicknameError("닉네임은 10글자 이하입니다.");
    setNicknameError("");
  };

  const patchNickname = async () => {
    try {
      if (!me?.data.ok) return message.error("로그인이 필요합니다.");
      if (nicknameError) return;
      const { data } = await patchUserAPI({ nickname });
      if (data.ok) return message.success("닉네임이 변경 되었습니다.");
      if (data.error) return message.error(data.error);
    } catch (e) {
      message.error("닉네임 변경에 실패했습니다.");
      console.log(e);
    }
  };

  const deleteUser = async () => {
    try {
      setDeleteUserLoading(true);
      if (!me?.data.ok) return message.error("로그인이 필요합니다.");
      Modal.confirm({
        title: "정말로 탈퇴하시겠습니까?",
        content: "탈퇴시 모든 데이터가 삭제되며, 복구할 수 없습니다.",
        okText: "탈퇴하기",
        cancelText: "취소",
        onOk: async () => {
          const { data } = await deleteUserAPI();
          await logout();
          if (data.ok) {
            window.location.href = "/";
            return message.success("회원 탈퇴 되었습니다.");
          }
          if (data.error) return message.error(data.error);
        },
        okButtonProps: {
          loading: deleteUserLoading,
        },
      });
    } catch {
      message.error("회원 탈퇴에 실패했습니다.");
    } finally {
      setDeleteUserLoading(false);
    }
  };

  useEffect(() => {
    if (!me) return;
    if (me.data.user.picture) setProfileImage(me.data.user.picture);
    if (me.data.user.nickname) setNickname(me.data.user.nickname);
    else setProfileImage(defaultProfileImage);
  }, [me]);

  return (
    <BasicContentLayout>
      <UserSettingComponentBlock>
        <div className="user-setting-update-image-wrapper">
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
        </div>
        <div className="user-setting-update-nickname-wrapper">
          <p className="user-setting-label">닉네임</p>
          <p className="user-setting-label-description">
            2글자 이상 10글자 미만 입려해주세요.
          </p>
          <div className="user-setting-nickname-input-button-wrapper">
            <InputWithError
              className="user-setting-nickname-input"
              value={nickname}
              error={nicknameError}
              placeholder="닉네임을 입력해주세요."
              maxLength={10}
              onChange={(e) => onChangeNickname(e.target.value)}
            />
            <Button onClick={patchNickname}>변경</Button>
          </div>
        </div>
        <div className="user-setting-delete-account-wrapper">
          <button
            className={`user-setting-delete-info-toggle-button ${
              isDeleteInfoVisible ? "open" : "close"
            }`}
            onClick={() => setIsDeleteInfoVisible(!isDeleteInfoVisible)}
          >
            <p className="user-setting-label">탈퇴하기</p>
            <DownOutlined />
          </button>
          <ul
            className={`user-setting-delete-account-guide-list ${
              isDeleteInfoVisible ? "visible" : ""
            }`}
          >
            <li>
              - 서비스에 만족하지 못하셨나요? 탈퇴하기 전에 먼저 개선 요청을
              해보시는 건 어떨까요?
            </li>
            <li>
              - 탈퇴시 유저와 관련된 모든 데이터가 삭제되며, 복구할 수 없습니다.
            </li>
            <Button
              className="user-setting-delete-button"
              danger
              loading={deleteUserLoading}
              onClick={deleteUser}
            >
              탈퇴하기
            </Button>
          </ul>
        </div>
      </UserSettingComponentBlock>
    </BasicContentLayout>
  );
};

export default UserSettingComponent;
