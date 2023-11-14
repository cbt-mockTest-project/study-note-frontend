import { PatchFolderInput } from "@/lib/apis/folder";
import { FolderAccess } from "@/types/folder";
import { Input, Modal, ModalProps, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import styled from "styled-components";

const FolderControlModalBlock = styled(Modal)`
  .folder-modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .folder-access-radio-group {
    margin-bottom: 10px;
  }
  .folder-modal-description {
    margin-top: 10px;
  }
`;

interface FolderControlModalProps extends Omit<ModalProps, "children"> {
  onChange: (data: PatchFolderInput) => void;
  defaultValues?: PatchFolderInput;
}

const FolderControlModal: React.FC<FolderControlModalProps> = (props) => {
  const { defaultValues, onChange, ...modalProps } = props;
  return (
    <FolderControlModalBlock {...modalProps}>
      <p className="folder-modal-title">폴더 만들기</p>
      <Radio.Group
        className="folder-access-radio-group"
        onChange={(e) =>
          onChange({
            access: e.target.value,
          })
        }
        size="large"
        defaultValue={defaultValues?.access || FolderAccess.PUBLIC}
      >
        <Radio value={FolderAccess.PUBLIC}>공개</Radio>
        <Radio value={FolderAccess.SECRET}>비공개</Radio>
      </Radio.Group>
      <Input
        size="large"
        placeholder="제목을 입력하세요."
        defaultValue={defaultValues?.name || undefined}
        onChange={(e) => {
          onChange({
            name: e.target.value,
          });
        }}
      />
      <TextArea
        className="folder-modal-description"
        placeholder="설명(선택)"
        defaultValue={defaultValues?.description || undefined}
        onChange={(e) => {
          onChange({
            description: e.target.value,
          });
        }}
      />
    </FolderControlModalBlock>
  );
};

export default FolderControlModal;
