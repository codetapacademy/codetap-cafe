import React from "react";

const TextArea = ({ placeholder, onChange, value }) => (
  <div>
    <textarea placeholder={placeholder} onChange={onChange} value={value} />
  </div>
);

TextArea.defaultProps = {
  value: "",
  placeholder: "Change me"
};
export default TextArea;
