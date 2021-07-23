import MockDate from 'mockdate';

import { rewrite } from '../../tokenizer';

const patterns = [
  // replaced
  ['%{year}', '2021'],
  ['%{year:+1y}', '2022'],
  ['%{year:-2y}', '2019'],
  ['%{year:+5m}', '2021'],
  ['%{year:+6m}', '2022'],
  ['%{year:+5m:+10d}', '2022'],
  ['prefix %{year} suffix', 'prefix 2021 suffix'],
  // invalid
  ['%{year:1y}', '%{year:1y}'],
  ['%{year:+1}', '%{year:+1}'],
  ['%{year+1y}', '%{year+1y}'],
  ['%{year:+1Y}', '%{year:+1Y}'],
  ['%{year:=1y}', '%{year:=1y}'],
  ['%{year:}', '%{year:}'],
  ['%{yeaar:1y}', '%{yeaar:1y}'],
  ['%{year:+5y:-2D}', '%{year:+5y:-2D}'],
];

beforeEach(() => {
  MockDate.set(new Date('2021-07-22'));
});

fdescribe('year', () => {
  test.each(patterns)(`%s ⏩ %s`, (text, expected) => {
    expect(rewrite(text)).toBe(expected);
  });
});
