// https://www.section.io/engineering-education/sorting-algorithms-in-js/
import { JaccardUser } from '../../../common/types';

function partition(items: JaccardUser[], left: number, right: number) {
  //rem that left and right are pointers.

  const pivot = items[Math.floor((right + left) / 2)];
  let i = left, //left pointer
    j = right; //right pointer

  while (i <= j) {
    //increment left pointer if the value is less than the pivot
    while (items[i].jaccardIndex < pivot.jaccardIndex) {
      i++;
    }

    //decrement right pointer if the value is more than the pivot
    while (items[j].jaccardIndex > pivot.jaccardIndex) {
      j--;
    }

    //else we swap.
    if (i <= j) {
      [items[i], items[j]] = [items[j], items[i]];
      i++;
      j--;
    }
  }

  //return the left pointer
  return i;
}

export function quickSort(items: JaccardUser[], left: number, right: number) {
  let index;

  if (items.length > 1) {
    index = partition(items, left, right); //get the left pointer returned

    if (left < index - 1) {
      //more elements on the left side
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      //more elements on the right side
      quickSort(items, index, right);
    }
  }

  return items; //return the sorted array
}
