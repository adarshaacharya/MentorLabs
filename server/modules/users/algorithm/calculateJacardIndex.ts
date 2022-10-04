/*
 * Calculate and return jaard similarity
 * Formula : (A intersection B) / (A union B)
 * @returns jacard index
 */
export const calculateJacardIndex = (text: string) => {
  const arr = text.split(',');
  const setData = [...new Set(arr)]; // duplicate values gets removed
  const originalArrayLength = arr.length;
  const setLength = setData.length;
  return ((originalArrayLength - setLength) / setLength) * 100;
};
