import { OpUnitType } from 'dayjs';

import * as c from '../constant';
import { dayjs } from '../libs/dayjs';
import { Rule } from '../rule';
import { mkl, prettyUnit } from '../util';

export const weekday: Rule<{
  sign: string;
  value: string;
  unit: OpUnitType;
}> = {
  name: 'weekday',
  patterns: [
    {
      pattern: new RegExp(
        `^(?<sign>${mkl(c.signs, {
          excludes: [c.signs[2]],
        })})(?<value>\\d+)(?<unit>${mkl(c.units)})$`
      ),
    },
  ],
  replaceValue: (token) => {
    let day = dayjs();

    token.eachParams((param, done) => {
      const { sign, value, unit } = param.evaluate || {};

      if (sign && value && unit) {
        day = day.add(Number(`${sign}${value}`), prettyUnit(unit));
        return done();
      }
    });

    if (!token.isValid()) {
      return;
    }

    return day.format('dddd');
  },
};
