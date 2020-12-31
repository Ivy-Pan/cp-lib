import { expect } from 'chai';
import { typeOf } from '../index';

const obj = 'str';

describe('typeOf', () => {
  it('typeOf str', () => {
    expect(typeOf(obj)).to.be.equal('string');
  });
});
