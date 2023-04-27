import { render, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import { Button } from "./button";

describe("Button", () => {
  //пустая кнопка
  it("button is empty", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  //кнопка с текстом
  it("button with text", () => {
    const button = renderer.create(<Button text="test" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  //неактивная кнопка
  it("button is disabled", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  //загрузка
  it("button is loading", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  //коллбэк
  it("button callback", () => {
    window.alert = jest.fn();
    render(<Button text="test" onClick={() => alert("callback")} />);
    const button = screen.getByText("test");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("callback");
  });
});
