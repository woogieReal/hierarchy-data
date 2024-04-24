export const getEmptyArrayIfNotArray = (target: any): Array<any> => {
  return Array.isArray(target) ? target : [];
}