import { RuleName } from './rules';

export type Token = TextToken | VariableToken;

class BaseToken {
  type = 'text';
  isVariable(): this is VariableToken {
    return this.type === 'variable';
  }
}

type TTOption = {
  value: string;
};

export class TextToken extends BaseToken {
  type = 'text';

  value: string;

  constructor(option: TTOption) {
    super();
    this.value = option.value;
  }
}

type VTOption<T> = {
  value: string;
  variable: string;
  rule: RuleName;
  params: {
    value: string;
    evaluate?: Partial<T>;
  }[];
};

export class VariableToken<T = Record<string, string>> extends BaseToken {
  type = 'variable';

  value: VTOption<T>['value'];
  replacedValue?: string;
  variable: VTOption<T>['variable'];
  rule: VTOption<T>['rule'];
  params: VTOption<T>['params'];

  private replacedValidation: boolean;

  constructor(option: VTOption<T>) {
    super();
    this.value = option.value;
    this.variable = option.variable;
    this.rule = option.rule;
    this.params = option.params;
    this.replacedValidation = false;
  }

  public eachParams(
    cb: (param: VariableToken<T>['params'][number], done: () => void) => void
  ) {
    let isValid = true;
    let doneCount = 0;
    const done = () => {
      doneCount = doneCount + 1;
    };
    this.params.forEach((param) => {
      cb(param, done);
      if (doneCount !== 1) {
        isValid = false;
      }
      doneCount = 0;
    });
    this.replacedValidation = isValid;
  }

  isValid() {
    return this.replacedValidation;
  }
}
