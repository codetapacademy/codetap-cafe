import React from "react";
import ButtonStyle from "./button.style";

const Button = ({ label = "Change me", onClick, disabled }) => (
  <ButtonStyle onClick={onClick} disabled={disabled}>
    {label}
  </ButtonStyle>
);

Button.defaultProps = {
  disabled: false
};

export default Button;
