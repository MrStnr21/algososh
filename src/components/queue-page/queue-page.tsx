import React, { useState, useEffect } from "react";

import styleQueuePage from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { Queue } from "./queue-class";

import { ElementStates } from "../../types/element-states";

export interface IQueueElement {
  value: number | string;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const [queueArr, setQueueArr] = useState<IQueueElement[]>([]);
  const [input, setInput] = useState<string>("");

  const [disableButton, setDisableButton] = useState<boolean>(true);

  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRem, setIsLoadingRem] = useState<boolean>(false);

  const initialQueueArr = [
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
    setInput(value);
  };

  //пауза между шагами цикла
  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  //добавляем элемент
  const handleAdd = async () => {
    setIsLoadingAdd(true);
    setDisableButton(true);
    setInput("");
    queue.enqueue(input);
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
    setDisableButton(true);
    queue.clear();
    queue.setContainer(initialQueueArr);
    setQueueArr([...queue.getElements()]);
    setDisableButton(false);
  };

  useEffect(() => {
    queue.setContainer(initialQueueArr);
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
            value={input}
          />
          <Button
            onClick={handleAdd}
            text={"Добавить"}
            disabled={input.length > 0 ? false : true}
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
