import { CleanUserData, User } from '../../../common/types';
import dfd from 'danfojs-node';

const spaceTrimmer = (texts: string[]) => {
  return texts.map((text) => text.replace(/\s+/g, ''));
};

const lowerCase = (texts: string[]) => {
  return texts.map((text) => text.toLowerCase());
};

/**
 * a KNN like algorithm implementation
 * KNN uses eucledian distance or cosine distance
 * Here we've used Jaccard similarity index to find the similarity between mentor and mentee
 */
export const recommenderKNN = (menteeArr: CleanUserData[], mentorsArr: CleanUserData[]) => {};
