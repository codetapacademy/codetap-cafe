import React from "react";

const Button = ({ label = "Change me", onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;
