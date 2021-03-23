const _Watcher = (function watch() {
  let watcher = null;

  return class Watcher {
    constructor() {
      // 单例模式
      if (watcher) return watcher;

      this._name = 'WATCHER';
      this._queue = {};
      watcher = this;
    }

    on(name, cb) {
      console.log(name);
      this._queue[name] = this._queue[name] || [];
      this._queue[name].push(cb);
    }

    emit(name, ...args) {
      const handlers = this._queue[name];

      if (handlers) {
        handlers.forEach(handler => {
          console.log(...args);
          handler.call(this, ...args);
        });
      }
    }

    remove(name, fnName) {
      if (name && this._queue[name]) {
        if (fnName === undefined || fnName === null) {
          delete this._queue[name];
        } else {
          const index = this._queue[name].find(fn => fn.name === fnName);

          if (index > -1) this._queue[name].splice(index, 1);
        }
      }
    }
  };
}());

export default _Watcher;
