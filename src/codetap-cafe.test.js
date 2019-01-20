import React from "react";
import ReactDOM from "react-dom";
import CodetapCafe from "./codetap-cafe";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CodetapCafe />, div);
  ReactDOM.unmountComponentAtNode(div);
});
