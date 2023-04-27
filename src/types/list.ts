import { ElementStates } from "./element-states";

//типизация для связного списка
export interface IListElement {
  value?: string | number;
  state?: ElementStates;
  circle?: null | {
    value?: string | number;
    state?: ElementStates;
  };
  circleSmall?: boolean;
}

export interface IList<T> {
  setContainer: (data: IListElement[]) => void;
  getElements: () => IListElement[];
  changeElement: (i: number, data: IListElement) => void;
  addByIndex: (index: number, input: string | number) => void;
  deleteByIndex: (index: number) => void;
  prepend: (input: IListElement) => void;
  append: (input: IListElement) => void;
  deleteTail: () => void;
  deleteHead: () => void;
}
