const toCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
export const convertKeysToCamelCase = (obj: Record<string, any>) => {
  let result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const camelKey = toCamelCase(key);
    result[camelKey] = obj[key];
  });
  return result;
};
