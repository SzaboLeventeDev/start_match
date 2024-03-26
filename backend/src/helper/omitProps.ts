const omitProps = <T extends object, K extends keyof T>(
  obj: T,
  ...props: K[]
): Omit<T, K> => {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
};

export default omitProps
