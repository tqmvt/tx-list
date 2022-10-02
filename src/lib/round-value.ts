export const roundValue = (value: string | number) => {
  return Number(Number(value).toFixed(1));
};
