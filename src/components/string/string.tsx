import React from "react";
import { useState, ChangeEvent } from "react";

import styleString from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";

interface IString {
  letter: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [displayArr, setDisplayArr] = useState<IString[]>([]);
  const [str, setStr] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setStr(evt.target.value);
  };

  //свапаем элементы местами
  const swap = (arr: IString[], firstIndex: number, secondIndex: number) => {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const handleClick = () => {
    let firstIndex = 0;
    let secondIndex = str.length - 1;
    let time = 1000;

    const inputArr = Array.from(str);
    const outputArr: IString[] = [];

    setStr("");
    setIsLoading(true);

    inputArr.forEach((item, index) => {
      const node = {
        letter: item,
        state: ElementStates.Default,
      };
      outputArr.push(node);
    });

    setDisplayArr([...outputArr]);

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
        setDisplayArr([...arr]);
      }, time);
      setTimeout(() => {
        swap(arr, firstIndex, secondIndex);
        arr[firstIndex].state = ElementStates.Modified;
        arr[secondIndex].state = ElementStates.Modified;
        setDisplayArr([...arr]);
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
      <form className={styleString.inputContainer}>
        <Input
          onChange={onChange}
          maxLength={11}
          isLimitText={true}
          id="string-input"
          value={str}
        />
        <Button
          onClick={handleClick}
          text={"Развернуть"}
          disabled={str.length > 0 ? false : true}
          isLoader={isLoading}
        />
      </form>
      <div className={styleString.lettersContainer}>
        {displayArr.map((item, index) => {
          return (
            <Circle state={item?.state} letter={item?.letter} key={index} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
