/**
 * @description Convert enum to array
 * @param enm
 */
export const enumToList = (enm: Record<string, unknown>): string[] => {
  const values = [] as string[];
  for (const key in enm) {
    values.push(enm[key] as string);
  }
  return values;
};
