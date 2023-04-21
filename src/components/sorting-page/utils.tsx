import { IQueueElement } from "../../types/queue";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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

//сортировка выбором
const selectionSort = async (
  arr: IQueueElement[],
  sortingType: string,
  setter?: React.Dispatch<React.SetStateAction<IQueueElement[]>>
) => {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    arr[i].state = ElementStates.Changing;
    setter && setter([...arr]);
    for (let j = i + 1; j < arr.length; j++) {
      if (
        sortingType === "asc"
          ? arr[minIdx].value > arr[j].value
          : arr[minIdx].value < arr[j].value
      ) {
        minIdx = j;
      }
      arr[j].state = ElementStates.Changing;
      setter && setter([...arr]);
      await sleep(SHORT_DELAY_IN_MS);
      arr[j].state = ElementStates.Default;
    }
    arr[i].state = ElementStates.Default;
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    arr[i].state = ElementStates.Modified;
    setter && setter([...arr]);
  }

  return arr;
};

//сортировка пузырьком
const bubbleSort = async (
  arr: IQueueElement[],
  sortingType: string,
  setter?: React.Dispatch<React.SetStateAction<IQueueElement[]>>
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setter && setter([...arr]);
      await sleep(SHORT_DELAY_IN_MS);
      if (
        sortingType === "asc"
          ? arr[j].value > arr[j + 1].value
          : arr[j].value < arr[j + 1].value
      ) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setter && setter([...arr]);
        await sleep(SHORT_DELAY_IN_MS);
      }
      arr[j].state = ElementStates.Default;
      arr[j + 1].state = ElementStates.Default;
      setter && setter([...arr]);
      await sleep(SHORT_DELAY_IN_MS);
    }
    arr[arr.length - 1 - i].state = ElementStates.Modified;
    setter && setter([...arr]);
  }

  if (arr.length > 0) {
    arr[0].state = ElementStates.Modified;
    arr[arr.length - 1].state = ElementStates.Modified;
    setter && setter([...arr]);
  }

  return arr;
};

export { newArr, selectionSort, bubbleSort };
