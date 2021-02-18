/**
 * 节流
 * @param {Function} fn 函数
 * @param {Number} wait 时间间隔
 */
function throttle(fn, wait) {
  let start = new Date();

  return function throttler(...args) {
    const timer = new Date() - start;
    if (timer >= wait) {
      fn.apply(this, args);
      start = new Date();
    }
  };
}

export default throttle;
