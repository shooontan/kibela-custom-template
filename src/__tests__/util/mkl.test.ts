import { mkl } from '../../util';

type MklInput = Parameters<typeof mkl>[0];
type MklOption = Parameters<typeof mkl>[1];

const patterns: {
  default: [MklInput, string][];
  option: [MklInput, MklOption, string][];
} = {
  default: [
    [[], ''],
    [['a', 'b', 'c'], 'a|b|c'],
  ],
  option: [
    [[], {}, ''],
    [['a', 'b', 'c'], {}, 'a|b|c'],
    [
      ['a', 'b', 'c'],
      {
        excludes: ['a'],
      },
      'b|c',
    ],
    [
      ['a', 'b', 'c'],
      {
        excludes: ['z'],
      },
      'a|b|c',
    ],
  ],
};

describe('mkl', () => {
  test.each(patterns.default)('default: %s ⏩ %s', (input, expected) => {
    expect(mkl(input)).toBe(expected);
  });

  test.each(patterns.option)(
    'with option: %s ⏩ %s',
    (input, opt, expected) => {
      expect(mkl(input, opt)).toBe(expected);
    }
  );
});
