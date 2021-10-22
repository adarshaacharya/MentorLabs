// https://www.section.io/engineering-education/sorting-algorithms-in-js/
// https://javascript.plainenglish.io/quick-sort-algorithm-in-javascript-5cf5ab7d251b

import { JaccardUser } from '../../../common/types';

function partitionHoare(items: JaccardUser[], left: number, right: number) {
  const pivot = items[Math.floor((right + left) / 2)];
  let i = left,
    j = right;

  while (i <= j) {
    while (items[i].jaccardIndex < pivot.jaccardIndex) {
      i++;
    }

    while (items[j].jaccardIndex > pivot.jaccardIndex) {
      j--;
    }

    if (i <= j) {
      [items[i], items[j]] = [items[j], items[i]];
      i++;
      j--;
    }
  }

  return i;
}

export function quicksortHoare(items: JaccardUser[], left: number, right: number) {
  let index;

  if (items.length > 1) {
    index = partitionHoare(items, left, right);

    if (left < index - 1) {
      quicksortHoare(items, left, index - 1);
    }

    if (index < right) {
      quicksortHoare(items, index, right);
    }
  }

  return items;
}
