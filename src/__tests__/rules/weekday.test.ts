import MockDate from 'mockdate';

import { rewrite } from '../../tokenizer';

const patterns = [
  // replaced
  ['%{weekday}', '木曜日'],
  ['%%{weekday}', '%木曜日'],
  ['%{weekday:+2d}', '土曜日'],
  ['%{weekday:-1d}', '水曜日'],
  ['%{weekday:+10d}', '日曜日'],
  ['%{weekday:-10d}', '月曜日'],
  ['%{weekday:+2w}', '木曜日'],
  ['%{weekday}/%{weekday}', '木曜日/木曜日'],
  ['prefix %{weekday} suffix', 'prefix 木曜日 suffix'],
  // invalid
  ['{weekday}', '{weekday}'],
  ['%{weekday:}', '%{weekday:}'],
  ['%{weekday+2d}', '%{weekday+2d}'],
  ['%{weekday:+2W}', '%{weekday:+2W}'],
  ['%{weekday:}', '%{weekday:}'],
  ['%{weekday:=sum}', '%{weekday:=sum}'],
  ['%{weekday:+2w:=sum}', '%{weekday:+2w:=sum}'],
  ['%{weekday:+2w:-1D}', '%{weekday:+2w:-1D}'],
  ['%{weeek:+2d}', '%{weeek:+2d}'],
];

beforeEach(() => {
  MockDate.set(new Date('2021-07-22'));
});

describe('weekday', () => {
  test.each(patterns)(`%s ⏩ %s`, (text, expected) => {
    expect(rewrite(text)).toBe(expected);
  });
});
