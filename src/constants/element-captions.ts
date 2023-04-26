const HEAD = "head";
const TAIL = "tail";

const defaultColor = "rgb(0, 50, 255)";
const changingColor = "rgb(210, 82, 225)";
const modifiedColor = "rgb(127, 224, 81)";

const circle = '[class^="circle_circle"]';
const circleSmall = '[class*="circle_small"]';

const inputValue = 'input[placeholder="Введите значение"]';
const inputIndex = 'input[placeholder="Введите индекс"]';

const buttonAdd = 'button[data-testid="add"]';
const buttonAddHead = 'button[data-testid="add-head"]';
const buttonAddTail = 'button[data-testid="add-tail"]';
const buttonAddByIndex = 'button[data-testid="add-by-index"]';

const buttonDelete = 'button[data-testid="delete"]';
const buttonDeleteHead = 'button[data-testid="delete-head"]';
const buttonDeleteTail = 'button[data-testid="delete-tail"]';
const buttonDeleteByIndex = 'button[data-testid="delete-by-index"]';

const buttonReset = 'button[data-testid="reset"]';

export {
  HEAD,
  TAIL,
  defaultColor,
  changingColor,
  modifiedColor,
  circle,
  circleSmall,
  inputValue,
  inputIndex,
  buttonAdd,
  buttonAddHead,
  buttonAddTail,
  buttonAddByIndex,
  buttonDelete,
  buttonDeleteHead,
  buttonDeleteTail,
  buttonDeleteByIndex,
  buttonReset,
};
