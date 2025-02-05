/**
 * @function omitProps
 * @description Removes specified key-value pairs from an object based on the provided property names.
 * @param obj The original object from which specified properties will be omitted.
 * @param props The property names that should be removed from the object.
 * @returns A new object with the specified properties removed.
 */
const omitProps = <T extends object, K extends keyof T>(obj: T, ...props: K[]): Omit<T, K> => {
  const result = { ...obj };
  props.forEach(prop => delete result[prop]);
  return result;
};

export default omitProps;
