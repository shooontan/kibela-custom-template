import { dayjs } from '../libs/dayjs';
import { Rule } from '../rule';

export const week: Rule = {
  name: 'week',
  replaceValue: () => {
    return dayjs().format('dd');
  },
};
