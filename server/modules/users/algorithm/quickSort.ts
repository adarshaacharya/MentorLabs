import { JaccardUser } from '../../../common/types';

const swap = (array: JaccardUser[], i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const partitionLomuto = (array: JaccardUser[], left: number, right: number) => {
  const pivot = right;
  let i = left;
  let j = left;
  for (; j < right; j++) {
    if (array[j].jaccardIndex <= array[pivot].jaccardIndex) {
      swap(array, i, j);
      i++;
    }
  }
  swap(array, i, j);
  return i;
};

export const quicksortLomuto = (array: JaccardUser[], left: number, right: number) => {
  left = left || 0;
  right = right || array.length - 1;

  const pivot = partitionLomuto(array, left, right);

  if (left < pivot - 1) {
    quicksortLomuto(array, left, pivot - 1);
  }

  if (right > pivot) {
    quicksortLomuto(array, pivot - 1, right);
  }
  return array;
};
