import React, { useState, useEffect } from "react";

import styleSortingPage from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";

import { IQueueElement } from "../../types/queue";
import { Direction } from "../../types/direction";

import { newArr, selectionSort, bubbleSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortingArr, setSortingArr] = useState<IQueueElement[]>([]);
  const [typeSort, setTypeSort] = useState<string>("selection");

  const [sortAscLoading, setSortAscLoading] = useState<boolean>(false);
  const [sortDescLoading, setSortDescLoading] = useState<boolean>(false);
  const [randomArrloading, setRandomArrloading] = useState<boolean>(false);

  const [disableInput, setDisableInput] = useState<boolean>(false);

  useEffect(() => {
    setSortingArr([...newArr(1, 100)]);
    // eslint-disable-next-line
  }, []);

  const handleRandom = () => {
    setRandomArrloading(true);
    setSortingArr([...newArr(1, 100)]);
    setRandomArrloading(false);
  };

  //сортировка выбором
  const getselectionSort = async (
    arr: IQueueElement[],
    sortingType: string
  ) => {
    setDisableInput(true);
    if (sortingType === "asc") {
      setSortAscLoading(true);
    } else {
      setSortDescLoading(true);
    }

    await selectionSort(arr, sortingType, setSortingArr);

    setDisableInput(false);
    setSortAscLoading(false);
    setSortDescLoading(false);
  };

  //сортировка пузырьком
  const getBubbleSort = async (arr: IQueueElement[], sortingType: string) => {
    setDisableInput(true);
    if (sortingType === "asc") {
      setSortAscLoading(true);
    } else {
      setSortDescLoading(true);
    }

    await bubbleSort(arr, sortingType, setSortingArr);

    setDisableInput(false);
    setSortAscLoading(false);
    setSortDescLoading(false);
  };

  //сортировка
  const handleSort = (arr: IQueueElement[], sortingType: string) => {
    if (typeSort === "selection") {
      getselectionSort(arr, sortingType);
    } else {
      getBubbleSort(arr, sortingType);
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
            onChange={() => setTypeSort("selection")}
          />
          <RadioInput
            label={"Пузырёк"}
            value="bubble"
            disabled={disableInput}
            checked={typeSort === "bubble" ? true : false}
            onChange={() => setTypeSort("bubble")}
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
          isLoader={randomArrloading}
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
