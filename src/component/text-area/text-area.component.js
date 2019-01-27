import React from "react";
import PropTypes from "prop-types";
import { TextAreaStyled } from "./text-area.style";

const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func
};

const defaultProps = {
  value: "",
  placeholder: "Change me"
};

const TextArea = ({ placeholder, onChange, onKeyDown, value }) => (
  <TextAreaStyled
    placeholder={placeholder}
    onKeyPress={onKeyDown}
    onChange={onChange}
    value={value}
    autoFocus
  />
);

TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTypes;

export default TextArea;
