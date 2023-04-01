import React, { useState, useEffect } from "react";

import styleListPage from "./list-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { LinkedList } from "./list-class";

import { sleep } from "../utils/utils";
import { handleSubmit } from "../utils/data";

import { IListElement } from "../../types/list";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const [listArr, setListArr] = useState<IListElement[]>([]);
  const [inputValue, setInputValue] = useState<string | number | undefined>("");
  const [inputIndex, setInputIndex] = useState<number | string>("");

  const [displayHead, setDisplayHead] = useState<boolean>(true);
  const [displayTail, setDisplayTail] = useState<boolean>(true);

  const [headLoading, setHeadLoading] = useState<boolean>(false);
  const [tailLoading, setTailLoading] = useState<boolean>(false);

  const [deleteHeadLoading, setDeleteHeadLoading] = useState<boolean>(false);
  const [deleteTailLoading, setDeleteTailLoading] = useState<boolean>(false);

  const [addByIndexLoading, setAddByIndexLoading] = useState<boolean>(false);
  const [deleteByIndexLoading, setDeleteByIndexLoading] =
    useState<boolean>(false);

  const [disableButton, setDisableButton] = useState<boolean>(false);

  //массив для связного списка
  const initialDataList = [
    {
      value: 0,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    },
    {
      value: 34,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    },
    {
      value: 8,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    },
    {
      value: 1,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    },
  ];

  const linkedList = React.useMemo(() => {
    return new LinkedList<string>(initialDataList);
    // eslint-disable-next-line
  }, []);

  //добавляем элемент по индексу
  const handleAddByIndex = async (
    index: string | number,
    input: string | number
  ) => {
    const arr = linkedList.getElements();
    const indexInput = Number(index);

    setDisableButton(true);
    setAddByIndexLoading(true);

    for (let i = 0; i < arr.length; i++) {
      if (indexInput !== i) {
        let changes = {
          state: ElementStates.Changing,
          circle: { value: input, state: ElementStates.Default },
        };
        linkedList.changeElement(i, changes);
        setListArr([...linkedList.getElements()]);
        setDisplayHead(false);
        await sleep(1000);
        linkedList.changeElement(i, { circle: null });
        setListArr([...linkedList.getElements()]);
      } else {
        let changes = {
          circle: { value: input, state: ElementStates.Changing },
        };
        linkedList.changeElement(indexInput, changes);
        setListArr([...linkedList.getElements()]);
        await sleep(1000);
        linkedList.changeElement(indexInput, { circle: null });
        setListArr([...linkedList.getElements()]);
        linkedList.addByIndex(indexInput, input);
        setListArr([...linkedList.getElements()]);
        linkedList.changeElement(i, { state: ElementStates.Modified });
        setListArr([...linkedList.getElements()]);
        setDisplayHead(true);
        await sleep(1000);
        linkedList.changeElement(i, { state: ElementStates.Default });
        setListArr([...linkedList.getElements()]);

        setDisableButton(false);
        setAddByIndexLoading(false);
        return;
      }
    }
  };

  //удаляем элемент по индексу
  const handleDeleteByIndex = async (index: number) => {
    const arr = listArr;
    const inputIndex = Number(index);

    setDisableButton(true);
    setDeleteByIndexLoading(true);

    for (let i = 0; i < arr.length; i++) {
      let changes = {};
      linkedList.changeElement(i, { state: ElementStates.Changing });
      setListArr([...linkedList.getElements()]);
      await sleep(1000);
      if (i === inputIndex) {
        changes = {
          state: ElementStates.Default,
          value: "",
          circle: { value: arr[i].value, state: ElementStates.Changing },
          circleBottom: true,
        };
        linkedList.changeElement(i, changes);
        setListArr([...linkedList.getElements()]);
        setDisplayTail(false);
        await sleep(1000);

        linkedList.deleteByIndex(i);
        setListArr([...linkedList.getElements()]);

        setDisplayTail(true);
        setDisableButton(false);
        setDeleteByIndexLoading(false);
        return;
      }
    }
    setListArr([...arr]);
  };

  //добавляем элемент в head
  const handleAddHead = async (input: string | number) => {
    setHeadLoading(true);
    setDisableButton(true);
    let changes = {
      state: ElementStates.Changing,
      circle: { value: input, state: ElementStates.Default },
      circleBottom: false,
    };

    linkedList.changeElement(0, changes);
    setInputValue("");
    setListArr([...linkedList.getElements()]);
    setDisplayHead(false);
    await sleep(1000);

    linkedList.changeElement(0, { circle: null, state: ElementStates.Default });
    if (listArr.length === 0) {
      linkedList.changeElement(0, {
        value: input,
        state: ElementStates.Default,
        circle: null,
        circleBottom: false,
      });
    } else {
      linkedList.prepend(input);
    }

    setListArr([...linkedList.getElements()]);
    setDisplayHead(true);
    await sleep(1000);
    linkedList.changeElement(0, { state: ElementStates.Default });
    setListArr([...linkedList.getElements()]);
    setHeadLoading(false);
    setDisableButton(false);
  };

  //добавляем элемент в tail
  const handleAddTail = async (input: string | number) => {
    setTailLoading(true);
    setDisableButton(true);
    const arr = linkedList.getElements();
    let step = arr.length - 1;
    let changes = {};
    changes = {
      circle: { value: input, state: ElementStates.Changing },
      circleBottom: false,
    };
    linkedList.changeElement(step, changes);
    setListArr([...linkedList.getElements()]);
    await sleep(1000);

    linkedList.changeElement(step, { circle: null });
    linkedList.append({
      value: input,
      state: ElementStates.Modified,
      circle: null,
      circleBottom: false,
    });
    setListArr([...linkedList.getElements()]);
    await sleep(1000);

    linkedList.changeElement(step + 1, { state: ElementStates.Default });
    setListArr([...linkedList.getElements()]);
    setTailLoading(false);
    setDisableButton(false);
  };

  //удаляем элемент из tail
  const handleDeleteTail = async () => {
    const arr = linkedList.getElements();
    const temp = arr[arr.length - 1];
    const changes = {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    };

    setDeleteTailLoading(true);
    setDisableButton(true);
    linkedList.changeElement(arr.length - 1, changes);
    setListArr([...linkedList.getElements()]);
    setDisplayTail(false);
    await sleep(1000);
    linkedList.deleteTail();
    setListArr([...linkedList.getElements()]);
    setDisplayTail(true);
    setDeleteTailLoading(false);
    setDisableButton(false);
  };

  //удаляем элемент из head
  const handleDeleteHead = async () => {
    const arr = linkedList.getElements();
    const temp = arr[0];

    setDeleteHeadLoading(true);
    setDisableButton(true);
    linkedList.changeElement(0, {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    });
    setListArr([...linkedList.getElements()]);
    await sleep(1000);
    linkedList.deleteHead();
    setListArr([...linkedList.getElements()]);
    setDeleteHeadLoading(false);
    setDisableButton(false);
  };

  //инпут значения
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue(value);
  };

  //инпут индекса
  const handleInputIndex = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputIndex(value);
  };

  useEffect(() => {
    setListArr([...linkedList.getElements()]);
    // eslint-disable-next-line
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styleListPage.inputContainer}>
        <form className={styleListPage.inputForm} onSubmit={handleSubmit}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder="Введите значение"
            id="list-input"
            onChange={handleInput}
            value={inputValue}
          />
          <Button
            text={"Добавить в head"}
            disabled={inputValue && !disableButton ? false : true}
            onClick={() => handleAddHead(inputValue!)}
            isLoader={headLoading}
          />
          <Button
            text={"Добавить в tail"}
            disabled={inputValue && !disableButton ? false : true}
            onClick={() => handleAddTail(inputValue!)}
            isLoader={tailLoading}
          />
          <Button
            text={"Удалить из head"}
            disabled={listArr.length > 0 && !disableButton ? false : true}
            onClick={handleDeleteHead}
            isLoader={deleteHeadLoading}
          />
          <Button
            text={"Удалить из tail"}
            disabled={listArr.length > 0 && !disableButton ? false : true}
            onClick={handleDeleteTail}
            isLoader={deleteTailLoading}
          />
        </form>
        <form className={styleListPage.inputForm} onSubmit={handleSubmit}>
          <Input
            placeholder="Введите индекс"
            id="list-input"
            onChange={handleInputIndex}
            value={(inputIndex as number) >= 0 ? inputIndex : ""}
          />
          <Button
            text={"Добавить по индексу"}
            onClick={() => handleAddByIndex(inputIndex!, inputValue!)}
            disabled={
              (inputIndex as number as number) <= listArr.length - 1 &&
              (inputIndex as number as number) >= 0 &&
              inputIndex &&
              !disableButton
                ? false
                : true
            }
            isLoader={addByIndexLoading}
          />
          <Button
            text={"Удалить по индексу"}
            disabled={
              (inputIndex as number) <= listArr.length - 1 &&
              (inputIndex as number) >= 0 &&
              inputIndex &&
              !disableButton
                ? false
                : true
            }
            onClick={() => handleDeleteByIndex(inputIndex as number)}
            isLoader={deleteByIndexLoading}
          />
        </form>
      </div>
      <div className={styleListPage.list}>
        {listArr &&
          listArr.map((item, index) => {
            return (
              <div
                key={Math.round(Math.random() * 1000000)}
                className={styleListPage.arrList}
              >
                <div className={styleListPage.circle_top}>
                  {item.circle && item.circleBottom === false && (
                    <Circle
                      letter={item?.circle?.value}
                      state={item.circle?.state}
                      isSmall
                    />
                  )}
                </div>
                <Circle
                  letter={item.value}
                  key={Math.round(Math.random() * index)}
                  state={item.state}
                  head={index === 0 && displayHead ? "head" : ""}
                  tail={
                    listArr.length - 1 === index && displayTail ? "tail" : ""
                  }
                  index={index}
                />

                <div className={styleListPage.circle_bottom}>
                  {item.circle && item.circleBottom && (
                    <Circle
                      letter={item?.circle?.value}
                      state={item.circle?.state}
                      isSmall
                    />
                  )}
                </div>
                {listArr.length - 1 !== index && <ArrowIcon />}
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
