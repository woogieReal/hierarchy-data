type AllType = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'

export const checkEmptyValue = (val: undefined | null | string | Array<any> | object) => {
  if (val === undefined || val === null) {
    return true;
  }

  if (typeof val === 'string') {
    return val.trim().length === 0 ? true : false;
  }

  if (typeof val === 'object') {
    return Object.keys(val).length === 0 ? true : false;
  }

  return false;
}
