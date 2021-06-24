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

/**
 * Set key value pair in storage.
 *
 * @param {string} key
 * @param {string} value
 */
export function set(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key: string) {
  localStorage.removeItem(key);
}

/**
 * Clear storage.
 *
 * @return {string}
 */
export function clear() {
  return localStorage.clear();
}
