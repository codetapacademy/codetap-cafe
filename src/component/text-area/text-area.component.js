import React from "react";

const TextArea = ({ placeholder, onKeyDown, value }) => (
  <div>
    <textarea
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      defaultValue={value}
    />
  </div>
);

TextArea.defaultProps = {
  value: "",
  placeholder: "Change me"
};
export default TextArea;
