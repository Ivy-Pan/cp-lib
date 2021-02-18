/**
 * 防抖
 * @param {Function} fn 函数
 * @param {Number} wait 延迟时间 ms
 * @param {Boolean} immedaite 是否立即执行
 */
function debounce(fn, wait, immedaite = false) {
  let timer = null;

  return function debouncer(...args) {
    if (timer) clearTimeout(timer);

    if (immedaite) {
      if (!timer) fn.apply(this, args);

      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    }
  };
}

export default debounce;
