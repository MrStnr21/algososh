import { IStack } from "../../types/stack";

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  getElements = (): T[] => {
    const arr = [];
    for (let i = 0; i < this.container.length; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  };

  clear = () => {
    this.container = [];
  };
}

export { Stack };
