import { OpUnitType } from 'dayjs';

import * as c from '../constant';
import { dayjs } from '../libs/dayjs';
import { Rule } from '../rule';
import { mkl, prettyUnit } from '../util';

export const month: Rule<{
  sign: string;
  week: c.Weeks;
  value: string;
  unit: OpUnitType;
}> = {
  name: 'month',
  patterns: [
    {
      pattern: new RegExp(`^(?<sign>${mkl(c.signs)})(?<week>${mkl(c.weeks)})$`),
    },
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
      const { sign, value, unit, week } = param.evaluate || {};

      if (week) {
        day = day.startOf('week').add(c.weeks.indexOf(week), 'day');
        return done();
      }

      if (sign && value && unit) {
        day = day.add(Number(`${sign}${value}`), prettyUnit(unit));
        return done();
      }
    });

    if (!token.isValid()) {
      return;
    }

    return `${day.month() + 1}`.padStart(2, '0');
  },
};
