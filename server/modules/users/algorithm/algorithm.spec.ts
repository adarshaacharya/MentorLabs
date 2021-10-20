import { quickSort } from './quickSort';

const arr = [
  {
    id: '1',
    jaccardIndex: 6.67,
  },
  {
    id: '2',
    jaccardIndex: 1.7,
  },
  {
    id: '3',
    jaccardIndex: 2.7,
  },
  {
    id: '4',
    jaccardIndex: 10.4,
  },
];

console.log(quickSort(arr, 0, arr.length - 1).reverse());
