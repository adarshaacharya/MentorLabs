import { CleanUserData, User } from '../../../common/types';

/*
{
    "id": "2a2e4113-19b4-4deb-8a8e-f8cd9ee7224b",
    "name": "Dan Abmarov",
    "email": "danny@gmail.com",
    "role": "Teacher",
    "avatar": "http://gravatar.com/avatar/81fdd84da7321e6765567607af226259?d=mm&r=pg&s=200",
    "profile": {
      "id": "83b4fc77-bfdb-4425-8da4-f885ea735a82",
      "createdAt": "2021-10-11T18:54:39.786Z",
      "updatedAt": "2021-10-11T18:54:39.786Z",
      "title": "Cs Student",
      "description": "In this form, we'll collect some basic and additional information about you. Your data is feed in our algorithm to recommend other users, so make sure that information entered is correct. 👇\n",
      "tags": [
        "databse",
        "networking",
        "compiler"
      ],
      "country": "United Arab Emirates",
      "languages": [
        "Abkhazian",
        "Afrikaans",
        "Albanian"
      ],
      "channels": [
        {
          "site": "twitter",
          "link": "https://fb.com"
        },
        {
          "site": "twitter",
          "link": "https://apil.com"
        },
        {
          "site": "slack",
          "link": "https://slack.com"
        }
      ],
      "userId": "2a2e4113-19b4-4deb-8a8e-f8cd9ee7224b"
    }
  },
*/

/**
 * clean the data to be feed to the algorithm
 * @param user
 */
const cleanUserData = (user: User): CleanUserData => {
  const { id, name, profile } = user;

  const { tags, title, country, languages } = profile;
  return { id, name, tags, title, country, languages, type: 'user' };
};

export const getRecommendation = (me: User, mentors: User[]) => {
  console.log(me);
  const menteeArr = [cleanUserData(me)];
  const mentorsArr = mentors.map((mentor) => cleanUserData(mentor));
  // recommenderKNN(menteeArr, mentorsArr);
  return { menteeArr, mentorsArr };
};
