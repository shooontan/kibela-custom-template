import MockDate from 'mockdate';

import { rewrite } from '../../tokenizer';

const patterns = [
  // replaced
  ['%{month}', '07'],
  ['%{month:=mon}', '06'],
  ['%{month:=mon:+2m}', '08'],
  ['%{month:=mon:+2month}', '08'],
  ['%{month:+1d}', '07'],
  ['%{month:-4d}', '06'],
  ['%{month:+2m}', '09'],
  ['%{month:+10m}', '05'],
  ['%{month:+3y}', '07'],
  ['%{month:+4m:-1m}', '10'],
  ['%{month:-1m} ~ %{month:+1m}', '06 ~ 08'],
  ['prefix %{month} suffix', 'prefix 07 suffix'],
  // invalid
  ['%{month:1d}', '%{month:1d}'],
  ['%{month:+1}', '%{month:+1}'],
  ['%{month+1d}', '%{month+1d}'],
  ['%{month:+1D}', '%{month:+1D}'],
  ['%{month:=1d}', '%{month:=1d}'],
  ['%{month:}', '%{month:}'],
  ['%{moonth:+1d}', '%{moonth:+1d}'],
  ['%{month:+4M:-1m}', '%{month:+4M:-1m}'],
];

beforeEach(() => {
  MockDate.set(new Date('2021-07-01'));
});

describe('month', () => {
  test.each(patterns)(`%s ⏩ %s`, (text, expected) => {
    expect(rewrite(text)).toBe(expected);
  });
});
