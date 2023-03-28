import React, { useState, ChangeEvent } from "react";

import styleFibonacciPage from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [displayArr, setDisplayArr] = useState<number[]>([]);
  const [num, setNum] = useState<any>("");

  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(evt.target.value);

    if (value && !isNaN(value)) {
      setDisableButton(false);
      if (value < 20) {
        setNum(value);
      }
    } else {
      if (value === 0) {
        setNum("");
      }
      setDisableButton(true);
    }
  };

  //пауза между шагами цикла
  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const handleClick = () => {
    const fibonacci = async (num: number) => {
      const arrFib: number[] = [];
      let time = 500;

      setIsLoading(true);
      setDisableInput(true);

      for (let i = 0; i <= num; i++) {
        if (i === 0) {
          arrFib.push(i);
          setDisplayArr([...arrFib]);
        } else if (i === 1) {
          arrFib.push(i);
          setDisplayArr([...arrFib]);
        } else if (i > 1) {
          arrFib.push(arrFib[i - 2] + arrFib[i - 1]);
          setDisplayArr([...arrFib]);
        }

        if (i === num) {
          setIsLoading(false);
          setDisableButton(false);
          setDisableInput(false);
        }
        await sleep(time);
      }
    };

    fibonacci(num);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styleFibonacciPage.inputContainer}>
        <Input
          maxLength={19}
          max={19}
          min={1}
          type={"number"}
          placeholder="Введите число"
          isLimitText={true}
          id="fibonacci-input"
          onChange={onChange}
          value={num}
          disabled={disableInput}
        />
        <Button
          onClick={handleClick}
          text={"Рассчитать"}
          disabled={disableButton}
          isLoader={isLoading}
        />
      </form>
      <div className={styleFibonacciPage.numbersContainer}>
        {displayArr.map((item, index) => {
          return <Circle letter={"" + item} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
