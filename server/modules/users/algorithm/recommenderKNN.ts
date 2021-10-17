import { User } from '../../../common/types';

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
export const recommenderKNN = (mentorsArr: User[], menteeArr: User[]) => {
  const mentorColumns = ['id', 'skills', 'tags', 'title', 'country', 'languages'];
  const menteeColumns = ['interests', 'tags', 'title', 'country', 'languages'];
  const normalizeColumns = ['tags', 'title', 'country'];
};
