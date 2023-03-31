import { ElementStates } from "./element-states";

export interface IQueueElement {
  value: number | string;
  state: ElementStates;
}

// eslint-disable-next-line
export interface IQueue<T> {
  enqueue: (data: string) => void;
  dequeue: () => void;
  clear: () => void;
  changeState: (i: number, state: ElementStates) => void;
}
