/**
 * Get value from storage for given key
 *
 * @param {string} key
 * @return {string | null}
 */
export function get(key: string) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}
