import { BrowserRouter } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { StringComponent } from "./string";
import { DELAY_IN_MS } from "../../constants/delays";

describe("Test reverse string", () => {
  it("Even length", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    const button = screen.getByTestId("button");
    const testString = "abcd";

    userEvent.type(input, testString);
    userEvent.click(button);
    waitFor(
      () => {
        expect(input).toHaveValue(testString);
        const elements = screen
          .getAllByTestId("circle")
          .map((el) => el.textContent);
        expect(elements.join("")).toBe(Array(testString).reverse().join(""));
      },
      { timeout: DELAY_IN_MS }
    );
  });

  it("Odd length", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    const button = screen.getByTestId("button");
    const testString = "abcde";

    userEvent.type(input, testString);
    userEvent.click(button);
    waitFor(
      () => {
        expect(input).toHaveValue(testString);
        const elements = screen
          .getAllByTestId("circle")
          .map((el) => el.textContent);
        expect(elements.join("")).toBe(Array(testString).reverse().join(""));
      },
      { timeout: DELAY_IN_MS }
    );
  });

  it("Length is 1", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    const button = screen.getByTestId("button");
    const testString = "a";

    userEvent.type(input, testString);
    userEvent.click(button);
    waitFor(
      () => {
        expect(input).toHaveValue(testString);
        const elements = screen
          .getAllByTestId("circle")
          .map((el) => el.textContent);
        expect(elements.join("")).toBe(Array(testString).reverse().join(""));
      },
      { timeout: DELAY_IN_MS }
    );
  });

  it("Empty", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    const button = screen.getByTestId("button");
    const testString = "";

    expect(input).toHaveValue(testString);
    expect(button).toBeDisabled();
  });
});
