import { dayjs } from '../libs/dayjs';
import { Rule } from '../rule';

export const weekday: Rule = {
  name: 'weekday',
  replaceValue: () => {
    return dayjs().format('dddd');
  },
};
