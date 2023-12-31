import { uploadImageAPI } from "@/lib/apis/upload";
import { Modal, UploadFile, message } from "antd";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import SkeletonBox from "@/ui/common/skeleton/SkeletonBox";

const CustomEditor = dynamic(
  async () => await import("@/ui/common/editor/CustomEditor"),
  {
    ssr: false,
    loading: () => <SkeletonBox width="100%" height="22.45px" />,
  }
);

const CardFormEditorBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  .ant-upload.ant-upload-select,
  .ant-upload-list-item,
  .ant-upload-wrapper,
  .ant-upload-list-item-container {
    width: 65px !important;
    height: 65px !important;
  }
`;

interface CardFormEditorProps {
  onChangeText: (text: string) => void;
  onChangeImage: (url: string) => void;
  editorPlaceholder?: string;
  text?: string;
  imgUrl?: string;
}

const CardFormEditor: React.FC<CardFormEditorProps> = ({
  onChangeText,
  onChangeImage,
  editorPlaceholder = "",
  text,
  imgUrl = "",
}) => {
  const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    setUploadImageLoading(true);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("jpg, png 파일만 업로드 가능합니다.");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("2MB 이하의 파일만 업로드 가능합니다.");
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = async (options: any) => {
    try {
      const form = new FormData();
      form.append("file", options.file);
      form.append("path", "study-card");
      const { data: imageData } = await uploadImageAPI(form);
      if (imageData.error) {
        message.error(imageData.error);
        return;
      }
      onChangeImage(imageData.url);
      options.onSuccess("ok", options.file);
    } catch {
      message.error("업로드에 실패했습니다.");
    } finally {
      setUploadImageLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    accept: ".png, .jpg, .jpeg",
    multiple: false,
    listType: "picture-card",
    beforeUpload: beforeUpload,
    fileList: imgUrl
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: imgUrl,
          },
        ]
      : [],
    customRequest: customRequest,
    onPreview: () => setIsImagePreviewModalOpen(true),
    onRemove: () => onChangeImage(""),
  };

  const uploadButton = (
    <div>{uploadImageLoading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  return (
    <CardFormEditorBlock>
      <CustomEditor
        onChangeText={onChangeText}
        text={text}
        placeholder={editorPlaceholder}
      />
      <Upload {...uploadProps}>{!imgUrl && uploadButton}</Upload>
      <Modal
        open={isImagePreviewModalOpen}
        footer={null}
        onCancel={() => setIsImagePreviewModalOpen(false)}
      >
        {imgUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="example" style={{ width: "100%" }} src={imgUrl} />
        )}
      </Modal>
    </CardFormEditorBlock>
  );
};

export default CardFormEditor;
