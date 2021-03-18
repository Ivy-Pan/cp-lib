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

    on(name, consumer) {
      this._queue[name] = this._queue[name] || [];
      this._queue.push(consumer);
    }

    emit(name, ...args) {
      const handlers = this._queue[name];

      if (handlers) {
        handlers.forEach(handler => {
          handler(...args);
        });
      }
    }
  };
}());

export default _Watcher;
