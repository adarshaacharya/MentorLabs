type WhenStringThanStringElseCustom<T, K> = T extends string ? string : K;

type ProcessEnvValue = string | undefined;

export const getEnv = <T extends string | undefined>(
  key: string,
  fallback?: T,
): WhenStringThanStringElseCustom<T, ProcessEnvValue> => {
  return process.env[key] ?? (fallback as WhenStringThanStringElseCustom<T, ProcessEnvValue>);
};
