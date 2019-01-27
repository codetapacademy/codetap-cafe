import React from "react";
import PropTypes from "prop-types";
import { TextAreaStyled } from "./text-area.style";

const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onKeyDown: PropTypes.func
};

const defaultProps = {
  value: "",
  placeholder: "Change me"
};

const TextArea = ({ placeholder, onKeyDown, value }) => (
  <TextAreaStyled
    placeholder={placeholder}
    onKeyDown={onKeyDown}
    defaultValue={value}
  />
);

TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTypes;

export default TextArea;
