import { Input, InputProps } from "antd";
import React from "react";
import styled from "styled-components";

const InputWithErrorBlock = styled.div`
  .input-error {
    color: red;
    margin-top: 5px;
    margin-left: 5px;
  }
`;

interface InputWithErrorProps extends InputProps {
  error?: string;
}

const InputWithError: React.FC<InputWithErrorProps> = (props) => {
  const { error, className, ...inputProps } = props;
  return (
    <InputWithErrorBlock className={className}>
      <Input {...inputProps} />
      {error && <p className="input-error">{error}</p>}
    </InputWithErrorBlock>
  );
};

export default InputWithError;
