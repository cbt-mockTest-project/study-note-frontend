import { Button, Modal, ModalProps } from "antd";
import React from "react";
import styled from "styled-components";
import { GoogleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";

const LoginModalBlock = styled(Modal)`
  .login-label {
    font-size: 16px;
    font-weight: bold;
  }
  .login-modal-google-button-wrapper {
    margin-top: 15px;
  }
  .login-modal-google-button-link {
    width: max-content;
    display: block;
    cursor: pointer;
    span {
      cursor: pointer;
    }
  }
  .login-modal-google-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: bold;
  }
`;

interface LoginModalProps extends ModalProps {}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const pathname = usePathname();
  return (
    <LoginModalBlock {...props}>
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
      </div>
    </LoginModalBlock>
  );
};

export default LoginModal;
