import { selectionSort, bubbleSort } from "./utils";

import { IQueueElement } from "../../types/queue";
import { ElementStates } from "../../types/element-states";

describe("Test sorting array", () => {
  //сортировка выбором
  describe("Test selection sort", () => {
    //по возрастанию
    describe("Ascending selection sort", () => {
      it("Empty", async () => {
        const array: Array<IQueueElement> = [];
        const result = await selectionSort(array, "asc");
        expect(result).toEqual([]);
      });

      it("Length is 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
        ];
        const result = await selectionSort(array, "asc");
        expect(result).toEqual([{ value: 21, state: ElementStates.Modified }]);
      });

      it("Length is > 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
          { value: 212, state: ElementStates.Default },
          { value: 2121, state: ElementStates.Default },
        ];
        const result = await selectionSort(array, "asc");
        expect(result).toEqual([
          { value: 21, state: ElementStates.Modified },
          { value: 212, state: ElementStates.Modified },
          { value: 2121, state: ElementStates.Modified },
        ]);
      });
    });

    //по убыванию
    describe("Descending selection sort", () => {
      it("Empty", async () => {
        const array: Array<IQueueElement> = [];
        const result = await selectionSort(array, "desc");
        expect(result).toEqual([]);
      });

      it("Length is 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
        ];
        const result = await selectionSort(array, "desc");
        expect(result).toEqual([{ value: 21, state: ElementStates.Modified }]);
      });

      it("Length is > 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
          { value: 212, state: ElementStates.Default },
          { value: 2121, state: ElementStates.Default },
        ];
        const result = await selectionSort(array, "desc");
        expect(result).toEqual([
          { value: 2121, state: ElementStates.Modified },
          { value: 212, state: ElementStates.Modified },
          { value: 21, state: ElementStates.Modified },
        ]);
      });
    });
  });

  //сортировка пузырьком
  describe("Test bubble sort", () => {
    //по возрастанию
    describe("Ascending bubble sort", () => {
      it("Empty", async () => {
        const array: Array<IQueueElement> = [];
        const result = await bubbleSort(array, "asc");
        expect(result).toEqual([]);
      });

      it("Length is 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
        ];
        const result = await bubbleSort(array, "asc");
        expect(result).toEqual([{ value: 21, state: ElementStates.Modified }]);
      });

      it("Length is > 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
          { value: 212, state: ElementStates.Default },
          { value: 2121, state: ElementStates.Default },
        ];
        const result = await bubbleSort(array, "asc");
        expect(result).toEqual([
          { value: 21, state: ElementStates.Modified },
          { value: 212, state: ElementStates.Modified },
          { value: 2121, state: ElementStates.Modified },
        ]);
      });
    });

    //по убыванию
    describe("Descending bubble sort", () => {
      it("Empty", async () => {
        const array: Array<IQueueElement> = [];
        const result = await bubbleSort(array, "desc");
        expect(result).toEqual([]);
      });

      it("Length is 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
        ];
        const result = await bubbleSort(array, "desc");
        expect(result).toEqual([{ value: 21, state: ElementStates.Modified }]);
      });

      it("Length is > 1", async () => {
        const array: Array<IQueueElement> = [
          { value: 21, state: ElementStates.Default },
          { value: 212, state: ElementStates.Default },
          { value: 2121, state: ElementStates.Default },
        ];
        const result = await bubbleSort(array, "desc");
        expect(result).toEqual([
          { value: 2121, state: ElementStates.Modified },
          { value: 212, state: ElementStates.Modified },
          { value: 21, state: ElementStates.Modified },
        ]);
      });
    });
  });
});
