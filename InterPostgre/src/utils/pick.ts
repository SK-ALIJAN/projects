/**
 * Returns a new object with only the specified keys
 */
export const pick = <T extends object, K extends readonly (keyof T)[]>(
  object: T,
  keys: K
): Pick<T, K[number]> => {
  return keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K[number]>);
};
