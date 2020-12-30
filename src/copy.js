import typeOf from './typeOf';

function copy(param, isDeep) {
  const type = typeOf(param);

  console.log(type, isDeep);
}

export default copy;
