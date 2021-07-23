import MockDate from 'mockdate';

import { rewrite } from '../../tokenizer';

const patterns = [
  // replaced
  ['%{day}', '22'],
  ['%{day:=mon}', '19'],
  ['%{day:=sun:+2day}', '20'],
  ['%{day:+1d}', '23'],
  ['%{day:+10d}', '1'],
  ['%{day:-4d}', '18'],
  ['%{day:+2m}', '22'],
  ['%{day:+3y}', '22'],
  ['%{day:+5d:-2d}', '25'],
  ['%{day:-1d} ~ %{day:+1d}', '21 ~ 23'],
  ['prefix %{day} suffix', 'prefix 22 suffix'],
  // invalid
  ['%{day:1d}', '%{day:1d}'],
  ['%{day:+1}', '%{day:+1}'],
  ['%{day+1d}', '%{day+1d}'],
  ['%{day:+1D}', '%{day:+1D}'],
  ['%{day:=1d}', '%{day:=1d}'],
  ['%{day:}', '%{day:}'],
  ['%{daay:1d}', '%{daay:1d}'],
  ['%{day:+5d:-2D}', '%{day:+5d:-2D}'],
];

beforeEach(() => {
  MockDate.set(new Date('2021-07-22'));
});

describe('day', () => {
  test.each(patterns)(`%s ⏩ %s`, (text, expected) => {
    expect(rewrite(text)).toBe(expected);
  });
});
