import { OpUnitType } from 'dayjs';

export const mkl = (
  values: ReadonlyArray<unknown> | Array<unknown>,
  option: {
    excludes?: unknown[];
  } = {
    excludes: [],
  }
) =>
  values
    .filter((value) => {
      return !option.excludes?.includes(value);
    })
    .join('|');

export const prettyUnit = (unit: OpUnitType) => {
  // for dayjs unit
  if (unit === 'm') {
    return 'M';
  }
  return unit;
};
