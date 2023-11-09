import { CreateFolderInput } from "@/lib/apis/folder";
import { FolderAccess } from "@/types/folder";
import { Input, Modal, ModalProps, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import styled from "styled-components";

const CreateFolderModalBlock = styled(Modal)`
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

interface CreateFolderModalProps extends Omit<ModalProps, "children"> {
  onChange: (createFolderInput: Partial<CreateFolderInput>) => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = (props) => {
  const { onChange, ...modalProps } = props;
  return (
    <CreateFolderModalBlock {...modalProps}>
      <p className="folder-modal-title">폴더 만들기</p>
      <Radio.Group
        className="folder-access-radio-group"
        onChange={(e) =>
          onChange({
            access: e.target.value,
          })
        }
        size="large"
        defaultValue={FolderAccess.PUBLIC}
      >
        <Radio value={FolderAccess.PUBLIC}>공개</Radio>
        <Radio value={FolderAccess.SECRET}>비공개</Radio>
      </Radio.Group>
      <Input
        size="large"
        placeholder="제목을 입력하세요."
        onChange={(e) => {
          onChange({
            name: e.target.value,
          });
        }}
      />
      <TextArea
        className="folder-modal-description"
        placeholder="설명(선택)"
        onChange={(e) => {
          onChange({
            description: e.target.value,
          });
        }}
      />
    </CreateFolderModalBlock>
  );
};

export default CreateFolderModal;
