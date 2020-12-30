import typeOf from './typeOf';

const BASE_COPY = {
  number: num => num,
  string: str => str,
  boolean: bool => bool,
  symbol: sb => sb,
  function: fn => fn,
  undefined: () => undefined,
  null: () => null,
  NaN: () => NaN,
  infinity: () => Infinity,
  '-infinity': () => -Infinity,
  date: date => new Date(date),
  error: err => new Error(err.message),
  regExp: reg => new RegExp(reg),
  // Array, Object, Set, Map
};

const COMPLEX_COPY = {
  object: (data, isDeep, copy) => {
    if (isDeep) {
      const dup = {};

      Object.entries(([key, value]) => {
        dup[key] = copy(value, isDeep);
      });

      return dup;
    }

    return { ...data };
  },
  map: () => {},
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
  const baseCopy = BASE_COPY[type];

  if (baseCopy) return baseCopy(data);

  return COMPLEX_COPY[type](data, isDeep, copy);
};

export default copy;
