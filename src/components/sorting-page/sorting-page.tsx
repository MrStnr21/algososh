import React, { useState, useEffect } from "react";

import styleSortingPage from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

import { sleep } from "../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";
import { IQueueElement } from "../../types/queue";

export const SortingPage: React.FC = () => {
  const [sortingArr, setSortingArr] = useState<IQueueElement[]>([]);
  const [typeSort, setTypeSort] = useState<string>("selection");

  const [sortAscLoading, setSortAscLoading] = useState<boolean>(false);
  const [sortDescLoading, setSortDescLoading] = useState<boolean>(false);

  const [disableInput, setDisableInput] = useState<boolean>(false);

  const time = SHORT_DELAY_IN_MS;

  //генератор рандомного числа
  const randomNumber = (min: number, max: number) => {
    const randomNum = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNum);
  };

  //генератор массива из рандомных чисел
  const randomArr = (min: number, max: number) => {
    const length = randomNumber(3, 19);
    const arr = Array.from({ length }, () => randomNumber(min, max));

    return arr;
  };

  //новый массив
  const newArr = (min: number, max: number) => {
    const arr = randomArr(min, max);
    const generatedArr: IQueueElement[] = [];
    // eslint-disable-next-line
    arr.map((item, index) => {
      const node = {
        value: item,
        state: ElementStates.Default,
      };
      generatedArr.push(node);
    });
    return generatedArr;
  };

  useEffect(() => {
    setSortingArr([...newArr(1, 100)]);
    // eslint-disable-next-line
  }, []);

  const handleRandom = () => {
    setSortingArr([...newArr(1, 100)]);
  };

  //сортировка выбором
  const selectionSort = async (arr: IQueueElement[], sortingType: string) => {
    setDisableInput(true);
    if (sortingType === "asc") {
      setSortAscLoading(true);
    } else {
      setSortDescLoading(true);
    }
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      arr[i].state = ElementStates.Changing;
      setSortingArr([...arr]);
      for (let j = i + 1; j < arr.length; j++) {
        if (
          sortingType === "asc"
            ? arr[minIdx].value > arr[j].value
            : arr[minIdx].value < arr[j].value
        ) {
          minIdx = j;
        }
        arr[j].state = ElementStates.Changing;
        setSortingArr([...arr]);
        await sleep(time);
        arr[j].state = ElementStates.Default;
      }
      arr[i].state = ElementStates.Default;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      arr[i].state = ElementStates.Modified;
      setSortingArr([...arr]);
      if (i === arr.length - 1) {
        setDisableInput(false);
        setSortAscLoading(false);
        setSortDescLoading(false);
      }
    }
  };

  //сортировка пузырьком
  const bubbleSort = async (arr: IQueueElement[], sortingType: string) => {
    setDisableInput(true);
    if (sortingType === "asc") {
      setSortAscLoading(true);
    } else {
      setSortDescLoading(true);
    }
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setSortingArr([...arr]);
        await sleep(time);
        if (
          sortingType === "asc"
            ? arr[j].value > arr[j + 1].value
            : arr[j].value < arr[j + 1].value
        ) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSortingArr([...arr]);
          await sleep(time);
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setSortingArr([...arr]);
        await sleep(time);
      }
      arr[arr.length - 1 - i].state = ElementStates.Modified;
      setSortingArr([...arr]);
      if (i + 1 === arr.length - 1) {
        setDisableInput(false);
        setSortAscLoading(false);
        setSortDescLoading(false);
      }
    }
    arr[0].state = ElementStates.Modified;
    arr[arr.length - 1].state = ElementStates.Modified;
    setSortingArr([...arr]);
  };

  const handleSort = (arr: IQueueElement[], sortingType: string) => {
    if (typeSort === "selection") {
      selectionSort(arr, sortingType);
    } else {
      bubbleSort(arr, sortingType);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styleSortingPage.inputContainer}>
        <div className={styleSortingPage.radioInputContainer}>
          <RadioInput
            label={"Выбор"}
            value="selection"
            disabled={disableInput}
            checked={typeSort === "selection" ? true : false}
            onClick={() => setTypeSort("selection")}
          />
          <RadioInput
            label={"Пузырёк"}
            value="bubble"
            disabled={disableInput}
            onClick={() => setTypeSort("bubble")}
          />
        </div>
        <div className={styleSortingPage.sortingDirectionContainer}>
          <Button
            onClick={() => handleSort(sortingArr, "asc")}
            sorting={Direction.Ascending}
            text={"По возрастанию"}
            disabled={disableInput}
            isLoader={sortAscLoading}
          />
          <Button
            onClick={() => handleSort(sortingArr, "desc")}
            sorting={Direction.Descending}
            text={"По убыванию"}
            disabled={disableInput}
            isLoader={sortDescLoading}
          />
        </div>
        <Button
          onClick={handleRandom}
          text={"Новый массив"}
          disabled={disableInput}
        />
      </form>
      <div className={styleSortingPage.resultContainer}>
        {sortingArr.length > 1 &&
          sortingArr.map((item, index) => {
            return (
              <Column
                state={item.state}
                index={item.value as number}
                key={index}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
