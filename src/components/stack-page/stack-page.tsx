import React, { useMemo, useState } from "react";

import styleStackPage from "./stack-page.module.css";

import { Stack } from "./stack-class";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<Array<string>>([]);

  const [inputValue, setInputValue] = useState<string>("");

  const [color, setColor] = useState<ElementStates>(ElementStates.Default);

  const time = SHORT_DELAY_IN_MS;

  const stack = useMemo(() => {
    return new Stack<string>();
  }, []);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue(value);
  };

  //добавляем элемент
  const handleAdd = () => {
    stack.push(inputValue);
    setInputValue("");
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setStackArr([...stack.getElements()]);
      setTimeout(() => {
        setColor(ElementStates.Default);
        setStackArr([...stack.getElements()]);
      }, time);
    }, time);
  };

  //удаляем элемент
  const handleDelete = () => {
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setStackArr([...stack.getElements()]);
      setTimeout(() => {
        stack.pop();
        setColor(ElementStates.Default);
        setStackArr([...stack.getElements()]);
      }, time);
    }, time);
  };

  //очищаем стек
  const handleClear = () => {
    setStackArr([]);
    stack.clear();
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styleStackPage.inputContainer}>
        <div className={styleStackPage.addRemoveContainer}>
          <Input
            maxLength={4}
            placeholder="Введите текст"
            isLimitText={true}
            id="stack-input"
            onChange={handleInput}
            value={inputValue}
          />
          <Button onClick={handleAdd} text={"Добавить"} />
          <Button onClick={handleDelete} text={"Удалить"} />
        </div>
        <Button onClick={handleClear} text={"Очистить"} />
      </form>
      <div className={styleStackPage.stackContainer}>
        {stack.getElements().length > 0 &&
          stack.getElements().map((item, index) => {
            return (
              <Circle
                letter={item}
                key={index}
                head={index === stackArr.length - 1 ? "top" : ""}
                state={
                  stackArr.length - 1 === index ? color : ElementStates.Default
                }
                index={index}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
