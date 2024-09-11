import assert from 'node:assert';

const MIN_CHARS = 2;
const MAX_CHARS = 7;

function validate(query) {
  assert(typeof query === 'string');
  assert(query.length >= MIN_CHARS);
  assert(query.length <= MAX_CHARS);
  assert(!query.includes('0'), 'zeros are not allowed');
}

export default validate;