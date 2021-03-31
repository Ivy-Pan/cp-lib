const watcher = {};

class Watcher {
  constructor(name) {
    // 单例模式
    if (watcher[name]) return watcher[name];

    this._name = name;
    this._queue = {};
    watcher[name] = this;
  }

  on(name, cb) {
    this._queue[name] = this._queue[name] || [];
    this._queue[name].push(cb);
  }

  emit(name, ...args) {
    const handlers = this._queue[name];

    if (handlers) {
      handlers.forEach(handler => {
        handler.call(this, ...args);
      });
    }
  }

  remove(name, cbName) {
    if (name && this._queue[name]) {
      if (!cbName) {
        delete this._queue[name];
      } else {
        const index = this._queue[name].find(fn => fn.name === cbName);

        if (index > -1) this._queue[name].splice(index, 1);
      }
    }
  }
}

export default Watcher;
