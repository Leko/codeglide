export const occurrence = (str, substr) => {
  let count = 0;
  let idx = 0;
  while (idx < str.length) {
    idx = str.indexOf(substr, idx);
    if (idx === -1) {
      break;
    }
    count++;
    idx += substr.length;
  }
  return count;
};
