import { render, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";

describe("Button", () => {
  it("button is empty", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("button with text", () => {
    const button = renderer.create(<Button text="test" />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("button is disabled", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("button is loading", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("button callback", () => {
    window.alert = jest.fn();
    render(<Button text="test" onClick={() => alert("callback")} />);
    const button = screen.getByText("test");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("callback");
  });
});
