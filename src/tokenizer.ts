import { isRuleName, rules } from './rules';
import { TextToken, Token, VariableToken } from './token';

export function rewrite(text: string) {
  const tokens = tokenize(text);
  return tokens
    .map((token) => {
      if (token.isVariable()) {
        return replace(token).replacedValue || token.value;
      }
      return token.value;
    })
    .join('');
}

function replace(token: VariableToken) {
  const rule = rules[token.rule];
  if (!rule.patterns?.length && token.params.length) {
    return token;
  }

  const value = rule.replaceValue(token);
  token.replacedValue = value;
  return token;
}

function evaluate(token: VariableToken) {
  const rule = rules[token.rule];
  token.params.forEach((param) => {
    rule.patterns?.forEach((pattern) => {
      const match = param.value.match(pattern.pattern);
      if (match && match.groups) {
        param.evaluate = match.groups;
      }
    });
  });
  return token;
}

function tokenize(text: string) {
  let target = text;
  const tokens: Token[] = [];
  const pattern = /%{[a-zA-Z]((?!{|}|%).)*[^:]}/;

  while (true) {
    const match = target.match(pattern);
    if (!match) {
      tokens.push(
        new TextToken({
          value: target,
        })
      );
      break;
    }

    const matchIdx = match.index || 0;

    // get the first text that is not variable template
    if (matchIdx) {
      tokens.push(
        new TextToken({
          value: target.substr(0, matchIdx),
        })
      );
    }

    // parse variable template
    const matchedText = match[0];
    const variable = matchedText.replace('%{', '').replace('}', '');
    const [ruleName, ...params] = variable.split(':');

    if (isRuleName(ruleName)) {
      const variableToken = new VariableToken({
        value: matchedText,
        variable,
        rule: ruleName,
        params: params.map((p) => ({ value: p })),
      });
      const replacedVariableToken = evaluate(variableToken);
      tokens.push(replacedVariableToken);
    } else {
      tokens.push(
        new TextToken({
          value: matchedText,
        })
      );
    }
    target = target.substr(matchIdx + matchedText.length);
  }

  return tokens;
}
