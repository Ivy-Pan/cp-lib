export default function toBool(value, except0 = false) {
  if (except0) {
    return value === 0 ? true : !!value;
  }

  return !!value;
}
