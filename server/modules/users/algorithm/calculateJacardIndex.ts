/*
 * Calculate and return jaard similarity
 * @returns jacard index
 */
export const calculateJacardIndex = (text: string) => {
  const arr = text.split(',');
  const dataWithoutRepetiton = [...new Set(arr)];
  const arrlength = arr.length;
  const noRepeatLength = dataWithoutRepetiton.length;
  return ((arrlength - noRepeatLength) / noRepeatLength) * 100;
};
