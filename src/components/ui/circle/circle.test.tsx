import renderer from "react-test-renderer";

import { Circle } from "./circle";

import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {
  //пустой круг
  it("circle is empty", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг с текстом
  it("circle with letter", () => {
    const circle = renderer.create(<Circle letter={"letter"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг head
  it("circle with head", () => {
    const circle = renderer.create(<Circle head={"head"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг с элементом
  it("circle with React.Element in head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг с индексом
  it("circle with index", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг с tail
  it("circle with tail", () => {
    const circle = renderer
      .create(<Circle tailType={"string"} tail={"tail"} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг с элементом в tail
  it("circle with React.Element in tail", () => {
    const circle = renderer
      .create(<Circle tailType={"element"} tail={<Circle />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  //маленький круг
  it("circle is small", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  //стандартный круг
  it("circle is default", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг в процессе изменения
  it("circle is changing", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  //круг с новыым значением
  it("circle is modified", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
