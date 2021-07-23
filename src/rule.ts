import { VariableToken } from './token';

export type Rule<T = unknown> = {
  name: string;
  patterns?: {
    pattern: RegExp;
  }[];
  replaceValue: (token: VariableToken<T>) => string | undefined;
};
