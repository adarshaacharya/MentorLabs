import { Role } from '../../../common/enums';
import { CleanUserData, JaccardUser, User } from '../../../common/types';
import { quicksortLomuto } from './quickSort';
import { recommenderKNN } from './recommenderKNN';

const BASE_JACCARD_INDEX = 0;

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

export const getRecommendation = (me: User, mentors: User[]) => {
  const menteeArr = [cleanUserData(me)];
  const mentorsArr = mentors.map((mentor) => cleanUserData(mentor));
  const mentorswithJaccardIndex = recommenderKNN(menteeArr, mentorsArr) as Array<JaccardUser>;

  const sortedmentorswithJaccardIndex = quicksortLomuto(mentorswithJaccardIndex, 0, mentorswithJaccardIndex.length - 1);

  const results: Array<User> = [];

  mentors.forEach((mentor) => {
    sortedmentorswithJaccardIndex.forEach((mj) => {
      if (mentor.id === mj.id && mj.jaccardIndex > BASE_JACCARD_INDEX) {
        const result = { ...mentor, jaccardIndex: Number(mj.jaccardIndex).toFixed(1) };
        results.push(result);
      }
    });
  });

  return results;
};
