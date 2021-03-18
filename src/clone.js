import typeOf from './typeOf';

const baseCopyTypes = ['number', 'string', 'boolean', 'symbol', 'function', 'undefined', 'null', 'NaN', 'infinity', '-infinity'];

// 属于 baseCopyTypes 的返回自身，其他类型递归 clone
const COPY_BY_TYPE = {
  baseCopy: param => param,
  date: date => new Date(date),
  error: err => new Error(err.message),
  regExp: reg => new RegExp(reg),
  object: (data, isDeep, copy) => {
    if (isDeep) {
      const dup = {};

      Object.entries(data).forEach(([key, value]) => {
        dup[key] = copy(value, isDeep);
      });

      return dup;
    }

    return { ...data };
  },
  map: (data, isDeep, copy) => {
    const dup = new Map();

    data.forEach((value, key) => {
      dup.set(
        isDeep ? copy(key, isDeep) : key,
        isDeep ? copy(value, isDeep) : value
      );
    });

    return dup;
  },
  array: (data, isDeep, copy) => {
    if (isDeep) return data.map(item => copy(item, isDeep));

    return [...data];
  },
  set: (data, isDeep, copy) => {
    if (isDeep) {
      const dup = [];

      data.forEach(item => {
        dup.push(copy(item, isDeep));
      });

      return dup;
    }

    return [...data];
  }
};

/**
 * 克隆
 * @param {any} data 待克隆对象
 * @param {Boolean} isDeep 是否深度克隆
 */
const clone = (data, isDeep) => {
  const type = typeOf(data);

  return baseCopyTypes.includes(type)
    ? COPY_BY_TYPE.baseCopy(data)
    : COPY_BY_TYPE[type](data, isDeep, clone);
};

export default clone;
