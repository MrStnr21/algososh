import React, { useState, useEffect } from "react";

import styleQueuePage from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { Queue } from "./queue-class";

import { sleep } from "../utils/utils";

import { ElementStates } from "../../types/element-states";
import { IQueueElement } from "../../types/queue";

export const QueuePage: React.FC = () => {
  const [queueArr, setQueueArr] = useState<IQueueElement[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [disableButton, setDisableButton] = useState<boolean>(true);

  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRem, setIsLoadingRem] = useState<boolean>(false);

  const initialDataQueue = [
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
  ];

  const checkEmpty = () => {
    const arr = queueArr.filter((item) => item.value !== "");

    if (arr.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const queue = React.useMemo(() => {
    return new Queue<string>();
  }, []);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue(value);
  };

  //добавляем элемент
  const handleAdd = async () => {
    setIsLoadingAdd(true);
    setDisableButton(true);
    setInputValue("");
    queue.enqueue(inputValue);
    queue.changeState(queue.newestIndex - 1, ElementStates.Changing);
    setQueueArr([...queue.getElements()]);
    await sleep(500);
    queue.changeState(queue.newestIndex - 1, ElementStates.Default);
    setQueueArr([...queue.getElements()]);
    setIsLoadingAdd(false);
    setDisableButton(false);
  };

  //удаляем элемент
  const handleDelete = async () => {
    setIsLoadingRem(true);
    setDisableButton(true);
    queue.dequeue();
    queue.changeState(queue.oldestIndex - 1, ElementStates.Changing);
    setQueueArr([...queue.getElements()]);
    await sleep(500);
    queue.changeState(queue.oldestIndex - 1, ElementStates.Default);
    setQueueArr([...queue.getElements()]);
    setIsLoadingRem(false);
    setDisableButton(false);
  };

  //очищаем стек
  const handleClear = () => {
    queue.clear();
    queue.setContainer(initialDataQueue);
    setQueueArr([...queue.getElements()]);
  };

  useEffect(() => {
    queue.setContainer(initialDataQueue);
    setQueueArr([...queue.getElements()]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDisableButton(checkEmpty());
    // eslint-disable-next-line
  }, [queueArr]);

  return (
    <SolutionLayout title="Очередь">
      <form className={styleQueuePage.inputContainer}>
        <div className={styleQueuePage.addRemoveContainer}>
          <Input
            maxLength={4}
            placeholder="Введите значение"
            isLimitText={true}
            id="stack-input"
            onChange={handleInput}
            value={inputValue}
          />
          <Button
            onClick={handleAdd}
            text={"Добавить"}
            disabled={inputValue.length > 0 ? false : true}
            isLoader={isLoadingAdd}
          />
          <Button
            onClick={handleDelete}
            text={"Удалить"}
            disabled={disableButton}
            isLoader={isLoadingRem}
          />
        </div>
        <Button
          onClick={handleClear}
          text={"Очистить"}
          disabled={queue.newestIndex ? false : true}
        />
      </form>
      <div className={styleQueuePage.stackContainer}>
        {queue.getElements() &&
          queue.getElements().map((item, index) => {
            return (
              <Circle
                letter={item.value as string}
                key={index}
                head={
                  item.value !== "" && index === queue.oldestIndex ? "head" : ""
                }
                tail={index + 1 === queue.newestIndex ? "tail" : ""}
                state={item.state}
                index={index}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
