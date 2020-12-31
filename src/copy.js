import typeOf from './typeOf';

const baseCopyTypes = ['number', 'string', 'boolean', 'symbol', 'function', 'undefined', 'null', 'NaN', 'infinity', '-infinity'];

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
        isDeep ? copy(value, isDeep) : value,
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
  },
};

const copy = (data, isDeep) => {
  const type = typeOf(data);

  return baseCopyTypes.includes(type)
    ? COPY_BY_TYPE.baseCopy(data)
    : COPY_BY_TYPE[type](data, isDeep, copy);
};

export default copy;
