// base methods
function read(storage, key) {
  const data = storage.getItem(key);

  return data ? JSON.parse(data) : data;
}

function save(storage, key, data) {
  storage.setItem(key, JSON.stringify(data));
}

/**
 * 读取 localStorage || sessionStorage
 * @param {String} sign - 标志，作为 Storage key
 * @param {localStorage|sessionStorage} config.pattern - 存储方式
 */
class Storage {
  constructor(sign, config = {}) {
    const {
      pattern = localStorage
    } = config;

    this._sign = sign;
    this._pattern = pattern;

    return new Proxy(this, {
      // 读取
      get(target, prop) {
        const { _sign, _pattern } = target;

        if (prop === '_sign' || prop === '_partern') return target[prop];

        const data = read(_pattern, _sign);

        return (data && data[prop]) || undefined;
      },

      // 设置
      set(target, prop, value) {
        const { _pattern, _sign } = target;
        const data = read(_pattern, _sign);

        if (!data) {
          save(_pattern, _sign, { [prop]: value });

          return true;
        }

        save(_pattern, _sign, {
          ...data,
          [prop]: value
        });

        return true;
      },

      // 删除
      deleteProperty(target, prop) {
        const { _pattern, _sign } = target;
        const data = read(_pattern, _sign);

        if (!data) return true;

        const restData = Object.entries(data).reduce(
          (rest, [key, value]) => {
            if (key === prop) return rest;

            return {
              ...rest,
              [key]: value
            };
          },
          {}
        );

        save(_pattern, _sign, restData);

        return true;
      }
    });
  }
}

export default Storage;
