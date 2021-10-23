/*
 * Calculate and return jaard similarity
 * @returns jacard index
 */
export const calculateJacardIndex = (text: string) => {
  const arr = text.split(',');
  const setData = [...new Set(arr)];
  const arrlength = arr.length;
  const noRepeatLength = setData.length;
  return ((arrlength - noRepeatLength) / noRepeatLength) * 100;
};
