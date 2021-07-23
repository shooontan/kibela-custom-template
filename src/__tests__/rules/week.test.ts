import MockDate from 'mockdate';

import { rewrite } from '../../tokenizer';

const patterns = [
  // replaced
  ['%{week}', '木'],
  ['%%{week}', '%木'],
  ['%{week}/%{week}', '木/木'],
  ['prefix %{week} suffix', 'prefix 木 suffix'],
  // invalid
  ['{week}', '{week}'],
  ['%{week:}', '%{week:}'],
  ['%{week:+2d}', '%{week:+2d}'],
];

beforeEach(() => {
  MockDate.set(new Date('2021-07-22'));
});

describe('week', () => {
  test.each(patterns)(`%s ⏩ %s`, (text, expected) => {
    expect(rewrite(text)).toBe(expected);
  });
});
