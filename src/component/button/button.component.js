import React from "react";
import PropTypes from "prop-types";
import ButtonStyle from "./button.style";

const Button = ({ label, onClick, disabled }) => (
  <ButtonStyle onClick={onClick} disabled={disabled}>
    {label}
  </ButtonStyle>
);

Button.defaultProps = {
  disabled: false,
  label: "Change me"
};

export default Button;
