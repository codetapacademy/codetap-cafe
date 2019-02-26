import React from "react";
import "../../../setupEnzyme";
import Button from "../button.component";
import { shallow, mount } from "enzyme";

describe("@Button component", () => {
  it("should render the default label", () => {
    const component = shallow(<Button />);
    const expected = "Change me";
    expect(component.text()).toBe(expected);
  });

  it("should render with custom label", () => {
    const expected = "Nice";
    const component = shallow(<Button label={expected} />);
    expect(component.text()).toBe(expected);
  });

  it("should be disabled", () => {
    const expected = true;
    const component = shallow(<Button label="Click me" disabled={expected} />);
    expect(component.props().disabled).toBe(expected);
  });

  it("should be clickable and receive one click event", () => {
    const clickHandlerMock = jest.fn();
    const component = shallow(<Button onClick={clickHandlerMock} />);
    component.simulate("click");
    expect(clickHandlerMock.mock.calls.length).toBe(1);
  });

  it("should not be clickable and not receive one click event", () => {
    const clickHandlerMock = jest.fn();
    const component = mount(
      <Button onClick={clickHandlerMock} disabled={true} />
    );
    component.simulate("click");
    expect(clickHandlerMock.mock.calls.length).toBe(0);
  });
});
