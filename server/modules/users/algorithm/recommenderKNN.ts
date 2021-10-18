import * as dfd from 'danfojs-node';
import { CleanUserData } from '../../../common/types';
import { calculateJacardIndex } from './calculateJacardIndex';

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
export const recommenderKNN = (menteeArr: CleanUserData[], mentorsArr: CleanUserData[]) => {
  // imp columns of mentor and mentee for recommendation
  const mentorColumns = ['id', 'title', 'country', 'languages', 'skills', 'type'];
  const menteeColumns = ['title', 'country', 'languages', 'interests', 'type'];
  const normalizeColumns = ['title', 'country', 'type'];

  const mentorsDF = new dfd.DataFrame(mentorsArr);
  const menteeDF = new dfd.DataFrame(menteeArr);

  // space trim and lowercase
  const mentorsRequired = mentorsDF.loc({ columns: mentorColumns });
  const mentorFor = mentorsRequired.loc({ columns: normalizeColumns });
  const mentorForLowerCase = mentorFor.apply(lowerCase, { axis: 0 });
  const mentorTrimmedSpace = mentorForLowerCase.apply(spaceTrimmer, { axis: 0 });

  const menteeRequired = menteeDF.loc({ columns: menteeColumns });
  const menteeFor = menteeRequired.loc({ columns: normalizeColumns });
  const menteeForLowerCase = menteeFor.apply(lowerCase, { axis: 0 });
  const menteeTrimmedSpace = menteeForLowerCase.apply(spaceTrimmer, { axis: 0 });

  // remove untrimmed and lowercased data
  mentorsRequired.drop({ columns: normalizeColumns, inplace: true });
  menteeRequired.drop({ columns: normalizeColumns, inplace: true });

  // add trimmed and lowercased data
  const finalMentors = dfd.concat({ df_list: [mentorsRequired, mentorTrimmedSpace], axis: 1 });
  const finalMentee = dfd.concat({ df_list: [menteeRequired, menteeTrimmedSpace], axis: 1 });

  // merge mentor and mentee
  const merge_df = dfd.merge({ left: finalMentee, right: finalMentors, on: ['type'] }); // type = user is common for

  const readyForTag = merge_df.loc({ columns: ['interests', 'languages', 'skills', 'languages_1'] });
  merge_df.drop({ columns: ['interests', 'languages', 'skills', 'languages_1'], inplace: true });

  const allString = readyForTag.apply_map((datas: any[]) => datas.join(','));

  const mergedStringDataFrame = dfd.concat({ df_list: [merge_df, allString], axis: 1 });
  const lastTag = mergedStringDataFrame.loc({
    columns: ['type', 'interests', 'languages', 'title', 'country', 'skills', 'languages_1', 'title_1', 'country_1'],
  });

  const finalTag = lastTag.apply((data: any[]) => data.join(','), { axis: 0 });

  const onlyId = mergedStringDataFrame.drop({
    columns: ['type', 'title', 'country', 'title_1', 'country_1', 'interests', 'languages', 'skills', 'languages_1'],
  });

  const finaleTag = dfd.concat({ df_list: [onlyId, finalTag], axis: 1 });

  finaleTag.rename({ mapper: { '0': 'Tags' }, inplace: true });

  const result = finaleTag.apply((data: string[]) => calculateJacardIndex(data[1]), { axis: 0 });

  const finalResult = finaleTag.addColumn({
    column: 'jaccardIndex',
    values: result.values as Array<number>,
  }) as dfd.DataFrame;

  const resultInJson = finalResult.loc({ columns: ['id', 'jaccardIndex'] }).to_json();

  return resultInJson;
};
