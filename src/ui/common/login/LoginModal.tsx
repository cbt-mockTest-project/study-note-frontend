import { Button, Modal, ModalProps } from "antd";
import React from "react";
import styled from "styled-components";
import { GoogleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
import KakaoIcon from "public/svg/login/kakao-icon.svg";
import { colors } from "@/styles/colors";

const LoginModalBlock = styled(Modal)`
  .login-label {
    font-size: 16px;
    font-weight: bold;
  }
  .login-modal-google-button-wrapper {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .login-modal-google-button-link {
    width: max-content;
    display: block;
    cursor: pointer;
    span {
      cursor: pointer;
    }
  }
  .login-modal-google-button,
  .login-modal-kakao-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    gap: 15px;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: bold;
    span {
      margin: 0px;
    }
  }
  .login-modal-kakao-button {
    &:hover {
      fill: ${colors.blue_700};
    }
  }

  .login-modal-kakao-icon {
    width: 20px;
    height: 20px;
  }
`;

interface LoginModalProps extends ModalProps {}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const pathname = usePathname();
  return (
    <LoginModalBlock {...props} footer={false}>
      <p className="login-label">로그인</p>
      <div className="login-modal-google-button-wrapper">
        <Link
          className="login-modal-google-button-link"
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`}
        >
          <Button
            size="large"
            className="login-modal-google-button"
            onClick={() => {
              setCookie("redirect", pathname, {
                maxAge: 60 * 5,
              });
            }}
          >
            <GoogleOutlined />
            <span>구글 로그인</span>
          </Button>
        </Link>
        <Link
          className="login-modal-kakao-button-link"
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
        >
          <Button
            size="large"
            className="login-modal-kakao-button"
            onClick={() => {
              setCookie("redirect", pathname, {
                maxAge: 60 * 5,
              });
            }}
          >
            <KakaoIcon class="login-modal-kakao-icon" />
            <span>카카오 로그인</span>
          </Button>
        </Link>
      </div>
    </LoginModalBlock>
  );
};

export default LoginModal;
