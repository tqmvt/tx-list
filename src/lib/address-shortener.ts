export const addressShortener = (address: string) => {
  return shortString(address, 4, 3);
};

export function shortString(str: string, leftChars = 3, rightChars = 3) {
  if (!str) return '';
  if (str.length <= leftChars + rightChars) return str;

  return `${str.substring(0, leftChars)}...${str.substring(
    str.length - rightChars,
    str.length
  )}`;
}
