import { CleanUserData } from '../../../common/types';
import { calculateJacardIndex } from './calculateJacardIndex';
import { quicksortHoare } from './quickSort';
import { recommenderKNN } from './recommenderKNN';

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

const menteeMockData: CleanUserData = {
  id: '1',
  name: 'random1',
  title: 'swe',
  interests: [],
  languages: [],
  country: 'random1',
  type: 'user',
};

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
    const MOCK_STR = 'str1 str2 str2 str1';
    expect(calculateJacardIndex(MOCK_STR)).toBeDefined();
    expect(calculateJacardIndex(MOCK_STR)).toBeGreaterThanOrEqual(0);
    expect(calculateJacardIndex(MOCK_STR)).toBeLessThanOrEqual(100);
  });
});

describe('KNN Recommender', () => {
  it('should return array of objects', () => {
    expect(recommenderKNN([menteeMockData], mentorsMockArr)).toMatchObject([{}]);
    expect(recommenderKNN([menteeMockData], mentorsMockArr)).toBeDefined();
  });
});
