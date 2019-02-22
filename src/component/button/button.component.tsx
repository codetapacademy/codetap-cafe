import React from "react";
import ButtonStyle from "./button.style";

// https://www.barbarianmeetscoding.com/blog/2016/05/13/argument-destructuring-and-type-annotations-in-typescript
const Button = (
  {
    label = "Change me",
    onClick,
    disabled = false,
    color
  }: { label: string; onClick: any; disabled: boolean; color: string } = {
    label,
    onClick,
    disabled,
    color
  }
) => (
  <ButtonStyle color={color} onClick={onClick} disabled={disabled}>
    {label}
  </ButtonStyle>
);

export default Button;
