import useMe from "@/lib/hooks/useMe";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { logout } from "@/lib/apis/user";
import LoginModal from "../common/login/LoginModal";
import { Button, Layout, Menu, Modal, Spin } from "antd";
import Image from "next/image";
import { colors } from "@/styles/colors";

const ProfileBoxBlock = styled.div`
  .root-layout-auth-wrapper {
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
    }
  }
  .root-layout-profile-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 10px;
  }
  .root-layout-profile-image {
    border-radius: 50%;
    object-fit: contain;
    background-color: ${colors.gray_50};
  }
  .root-layout-profile-nickname {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .root-layout-logout-button {
    margin-top: 10px;
  }
`;

interface ProfileBoxProps {}

const ProfileBox: React.FC<ProfileBoxProps> = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { me, isLoadingMe } = useMe();
  return (
    <ProfileBoxBlock>
      <div className="root-layout-auth-wrapper">
        {isLoadingMe ? (
          <Spin />
        ) : (
          !me?.data && (
            <Button onClick={() => setLoginModalOpen(true)}>로그인</Button>
          )
        )}
        {me?.data && (
          <>
            <div className="root-layout-profile-wrapper">
              <Image
                className="root-layout-profile-image"
                src={me.data.user.picture || "/png/default-profile.png"}
                alt="프로필 이미지"
                width={25}
                height={25}
              />
              <span className="root-layout-profile-nickname">
                {me.data.user.nickname}
              </span>
            </div>
            <Button
              className="root-layout-logout-button"
              onClick={() => {
                logout();
                window.location.reload();
              }}
            >
              로그아웃
            </Button>
          </>
        )}
      </div>
      <LoginModal
        open={loginModalOpen}
        footer={false}
        onCancel={() => setLoginModalOpen(false)}
      />
    </ProfileBoxBlock>
  );
};

export default ProfileBox;
