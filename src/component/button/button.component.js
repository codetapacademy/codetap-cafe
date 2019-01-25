import React from "react";
import ButtonStyle from "./button.style";

const Button = ({ label = "Change me", onClick }) => (
  <ButtonStyle onClick={onClick}>{label}</ButtonStyle>
);

export default Button;
