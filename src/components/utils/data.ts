import { IString } from "../../types/string";

//свапаем элементы местами
const swap = (arr: IString[], firstIndex: number, secondIndex: number) => {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

//отключаем автосабмит и пустые инпуты
const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();
};

export { swap, handleSubmit };
