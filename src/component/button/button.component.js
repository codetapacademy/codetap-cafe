import React from "react";
import PropTypes from "prop-types";
import ButtonStyle from "./button.style";

const propTypes = {
  /**
   * The text content of the button
   */
  label: PropTypes.string,
  /**
   * The function to call back when the button is pressed
   */
  onClick: PropTypes.func,
  /**
   * Indicates if the button can receive and send events
   * as well as has a visual state of not usable or clickable
   */
  disabled: PropTypes.bool
};

const defaultProps = {
  disabled: false,
  label: "Change me"
};

const Button = ({ label, onClick, disabled }) => (
  <ButtonStyle onClick={onClick} disabled={disabled}>
    {label}
  </ButtonStyle>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
