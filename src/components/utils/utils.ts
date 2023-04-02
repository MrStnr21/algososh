//пауза между шагами цикла
function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export { sleep };
