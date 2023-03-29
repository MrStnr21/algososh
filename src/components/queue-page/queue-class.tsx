import { ElementStates } from "../../types/element-states";

interface IQueueElement {
  value: number | string;
  state: ElementStates;
}
// eslint-disable-next-line
interface IQueue<T> {
  enqueue: (data: string) => void;
  dequeue: () => void;
  clear: () => void;
  changeState: (i: number, state: ElementStates) => void;
}

class Queue<T> implements IQueue<T> {
  private container: IQueueElement[];
  oldestIndex: number;
  newestIndex: number;

  constructor() {
    this.oldestIndex = 0;
    this.newestIndex = 0;
    this.container = [];
  }

  changeState = (index: number, state: ElementStates) => {
    this.container[index].state = state;
  };

  setContainer = (data: IQueueElement[]) => {
    this.container = [...data];
  };

  enqueue = (data: string) => {
    this.container[this.newestIndex].value = data;
    this.newestIndex++;
  };

  getElements = () => {
    const arr = [];
    for (let i = 0; i < this.container.length; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  };

  dequeue = () => {
    var oldestIndex = this.oldestIndex,
      newestIndex = this.newestIndex,
      deletedData;

    if (oldestIndex !== newestIndex) {
      deletedData = this.container[oldestIndex];
      this.container[oldestIndex] = { value: "", state: ElementStates.Default };
      this.oldestIndex++;

      return deletedData;
    }
  };

  clear = () => {
    this.container = [];
    this.newestIndex = 0;
    this.oldestIndex = 0;
  };
}

export { Queue };
