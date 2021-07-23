import MockDate from 'mockdate';

import { rewrite } from '../../tokenizer';

const patterns = [
  // replaced
  ['%{weekday}', '木曜日'],
  ['%%{weekday}', '%木曜日'],
  ['%{weekday}/%{weekday}', '木曜日/木曜日'],
  ['prefix %{weekday} suffix', 'prefix 木曜日 suffix'],
  // invalid
  ['{weekday}', '{weekday}'],
  ['%{weekday:}', '%{weekday:}'],
  ['%{weekday:-1d}', '%{weekday:-1d}'],
];

beforeEach(() => {
  MockDate.set(new Date('2021-07-22'));
});

describe('weekday', () => {
  test.each(patterns)(`%s ⏩ %s`, (text, expected) => {
    expect(rewrite(text)).toBe(expected);
  });
});
