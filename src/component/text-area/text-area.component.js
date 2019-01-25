import React from "react";
import styled from "styled-components";

const TextAreaStyled = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const TextArea = ({ placeholder, onKeyDown, value }) => (
  <TextAreaStyled
    placeholder={placeholder}
    onKeyDown={onKeyDown}
    defaultValue={value}
  />
);

TextArea.defaultProps = {
  value: "",
  placeholder: "Change me"
};
export default TextArea;
