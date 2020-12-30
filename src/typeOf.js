/**
 * 数据类型判断
 * @param {*} obj
 * @return
 *    String     // "string"
 *    Boolean    // "boolean"
 *    Symbol     // "symbol"
 *    Function   // "function"
 *    undefined  // "undefined"
 *    Number     // "number"
 *    NaN        // "NaN"
 *    Infinity   // "infinity"
 *    -Infinity  // "-infinity"
 *    null       // "null"
 *    Object     // "object"
 *    Array      // "array"
 *    RegExp     // "regExp"
 *    Date       // "date"
 *    Error      // "error"
 *    Set        // "set"
 *    Map        // "map"
 */
export default obj => {
  let type = Object.prototype.toString.call(obj).slice(8, -1).replace(/^\w?/, $1 => $1.toLowerCase());

  if (type === 'number') {
    if (Number.isNaN(obj)) type = 'NaN';
    if (obj === Infinity) type = 'infinity';
    if (obj === -Infinity) type = '-infinity';
  }

  return type;
};
