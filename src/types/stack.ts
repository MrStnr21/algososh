export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getElements: () => (T | null)[];
    clear: () => void;
  }