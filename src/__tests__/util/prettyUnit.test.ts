import { prettyUnit } from '../../util';

type Unit = Parameters<typeof prettyUnit>[0];

const patterns: [Unit, string][] = [
  ['m', 'M'],
  ['d', 'd'],
  ['y', 'y'],
];

describe('prettyUnit', () => {
  test.each(patterns)('%s ⏩ %s', (input, expected) => {
    expect(prettyUnit(input)).toBe(expected);
  });
});
