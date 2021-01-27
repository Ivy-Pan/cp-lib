const Observer = (function Observer(_name = 'OBSERVER') {
  let observer = null;

  return class {
    constructor() {
      if (observer) return observer;

      this._name = _name;
      this._queue = {};
      observer = this;
    }

    bind(name, consumer) {
      this._queue[name] = this._queue[name] || [];
      this._queue.push(consumer);
    }

    dispatch(name, ...args) {
      const consumers = this._queue[name];

      if (consumers) {
        consumers.forEach(consumer => {
          consumer(...args);
        });
      }
    }
  };
}());

export default Observer;
