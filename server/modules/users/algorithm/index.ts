import { Role } from '../../../common/enums';
import { CleanUserData, JaccardUser, User } from '../../../common/types';
import { quicksortHoare } from './quickSort';
import { recommenderKNN } from './recommenderKNN';

const BASE_JACCARD_INDEX = 10; // 10%

/**
 * clean the data to be feed to the algorithm
 * @param user
 */
const cleanUserData = (user: User): CleanUserData => {
  const { id, name, profile, role } = user;
  const { tags, title, country, languages } = profile;

  if (role === Role.STUDENT) {
    return { id, name, interests: tags, title, country, languages, type: 'user' }; // if user is student then change tags columns to interests
  }

  return { id, name, skills: tags, title, country, languages, type: 'user' };
};

/**
 * @description main recommendation algorithm using jaccard index
 * @param me
 * @param mentors
 * @returns
 */
export const getRecommendation = (me: User, mentors: User[]) => {
  const menteeArr = [cleanUserData(me)];
  const mentorsArr = mentors.map((mentor) => cleanUserData(mentor));
  const mentorswithJaccardIndex = recommenderKNN(menteeArr, mentorsArr) as Array<JaccardUser>;

  const sortedmentorswithJaccardIndex =
    mentorswithJaccardIndex.length > 0
      ? quicksortHoare(mentorswithJaccardIndex, 0, mentorswithJaccardIndex.length - 1).reverse()
      : mentorswithJaccardIndex.reverse();

  const results: Array<User> = [];

  mentors.forEach((mentor) => {
    sortedmentorswithJaccardIndex.forEach((mentorWithJaccardIndex) => {
      if (mentor.id === mentorWithJaccardIndex.id && mentorWithJaccardIndex.jaccardIndex > BASE_JACCARD_INDEX) {
        const result = { ...mentor, jaccardIndex: Number(mentorWithJaccardIndex.jaccardIndex).toFixed(1) };
        results.push(result);
      }
    });
  });

  return results;
};
