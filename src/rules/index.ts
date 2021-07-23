import { Rule } from '../rule';
import { day } from './day';
import { month } from './month';
import { week } from './week';
import { weekday } from './weekday';
import { year } from './year';

export const rules = {
  day,
  month,
  year,
  week,
  weekday,
} as const;

export type RuleName = keyof typeof rules;

export function isRuleName(ruleName: string): ruleName is RuleName {
  const rule = (rules as Record<string, Rule>)[ruleName];
  return !!rule;
}
