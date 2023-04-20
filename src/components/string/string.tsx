import React from "react";
import { useState, ChangeEvent } from "react";

import styleString from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { swap } from "../utils/data";
import { DELAY_IN_MS } from "../../constants/delays";
import { handleSubmit } from "../utils/data";

import { ElementStates } from "../../types/element-states";
import { IString } from "../../types/string";

export const StringComponent: React.FC = () => {
  const [stringArr, setStringArr] = useState<IString[]>([]);

  const [inputString, setInputString] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputString(evt.target.value);
  };

  const handleClick = () => {
    let firstIndex = 0;
    let secondIndex = inputString.length - 1;
    let time = DELAY_IN_MS;

    const inputArr = Array.from(inputString);
    const outputArr: IString[] = [];

    setInputString("");
    setIsLoading(true);

    inputArr.forEach((item, index) => {
      const node = {
        letter: item,
        state: ElementStates.Default,
      };
      outputArr.push(node);
    });

    setStringArr([...outputArr]);

    setTimeout(() => {
      while (firstIndex <= secondIndex) {
        reverseString(outputArr, firstIndex, secondIndex, time);

        firstIndex++;
        secondIndex--;
        time += 1000;
      }
    }, 1000);

    //разворачиваем строку
    const reverseString = (
      arr: IString[],
      firstIndex: number,
      secondIndex: number,
      time: number
    ) => {
      setTimeout(() => {
        arr[firstIndex].state = ElementStates.Changing;
        arr[secondIndex].state = ElementStates.Changing;
        setStringArr([...arr]);
      }, time);
      setTimeout(() => {
        swap(arr, firstIndex, secondIndex);
        arr[firstIndex].state = ElementStates.Modified;
        arr[secondIndex].state = ElementStates.Modified;
        setStringArr([...arr]);
      }, time + 1000);
      if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
        setTimeout(() => {
          setIsLoading(false);
        }, time + 1000);
      }
    };
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styleString.inputContainer} onSubmit={handleSubmit}>
        <Input
          data-testid="string-input"
          onChange={onChange}
          maxLength={11}
          max={11}
          min={1}
          placeholder="Введите текст"
          isLimitText={true}
          id="string-input"
          value={inputString}
        />
        <Button
          onClick={handleClick}
          text={"Развернуть"}
          disabled={inputString.length > 0 ? false : true}
          isLoader={isLoading}
          data-testid="button"
        />
      </form>
      <div className={styleString.lettersContainer}>
        {stringArr.map((item, index) => {
          return (
            <Circle
              state={item?.state}
              letter={item?.letter}
              key={index}
              data-testid="circle"
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
