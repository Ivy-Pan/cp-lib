/**
 * parse time to formatter string
 */
function parseTime(datetime, formatter = 'yyyy-MM-dd hh:mm:ss') {
  if (!datetime) return null;

  const _datetime = new Date(datetime);
  const _formatter = {
    y: _datetime.getFullYear(),
    M: _datetime.getMonth() + 1,
    d: _datetime.getDate(),
    h: _datetime.getHours(),
    m: _datetime.getMinutes(),
    s: _datetime.getSeconds(),
    w: _datetime.getDay()
  };
  const timeStr = formatter.replace(/([yMdhmsw]+)/g, key => {
    const _key = key[0];
    const value = `${_formatter[_key]}`;

    if (_key === 'w') return ['日', '一', '二', '三', '四', '五', '六'][value];

    return `${value}`.padStart(key.length, '0');
  });

  return timeStr;
}

export default parseTime;
