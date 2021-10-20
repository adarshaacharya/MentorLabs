import { calculateJacardIndex } from './calculateJacardIndex';
import { quicksortHoare } from './quickSort';
import { recommenderKNN } from './recommenderKNN';
import { CleanUserData } from '../../../common/types';

const mockKNNArray = [
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

describe('QuickSortHoare', () => {
  it('should sort the array in ascending order', () => {
    expect(quicksortHoare(mockKNNArray, 0, mockKNNArray.length - 1)).toBe(mockKNNArray.sort());
  });

  it('should give length of array four', () => {
    expect(quicksortHoare(mockKNNArray, 0, mockKNNArray.length - 1)).toHaveLength(4);
  });
});

describe('JacardIndex', () => {
  it('should return number', () => {
    expect(calculateJacardIndex('my name is khan')).toBeDefined();
    expect(calculateJacardIndex('aabbcdasd')).toBeGreaterThanOrEqual(0);
    expect(calculateJacardIndex('aabbcdasd')).toBeLessThanOrEqual(100);
  });
});

const mentorsMockArr: CleanUserData[] = [
  {
    id: '1',
    name: 'random1',
    title: 'swe',
    skills: [],
    interests: [],
    languages: [],
    country: 'random1',
    type: 'user',
  },
  {
    id: '2',
    name: 'random2',
    title: 'random2',
    skills: [],
    languages: [],
    country: 'random2',
    type: 'user',
  },
];

const menteeMockArr: CleanUserData[] = [
  {
    id: '1',
    name: 'random1',
    title: 'swe',
    interests: [],
    languages: [],
    country: 'random1',
    type: 'user',
  },
];

describe('KNN Recommender', () => {
  it('should return array of objects', () => {
    expect(recommenderKNN(menteeMockArr, mentorsMockArr)).toMatchObject([{}]);
  });
});
