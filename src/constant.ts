export const units = [
  'year',
  'month',
  'day',
  'week',
  'y',
  'm',
  'd',
  'w',
] as const;
export const signs = ['\\+', '-', '='] as const;
export const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

export type Units = typeof units[number];
export type Signs = typeof signs[number];
export type Weeks = typeof weeks[number];

export const selector = {
  titlearea: '.editor-titleBox-flexInput-input',
  preview: '.editor-titleBox-preview span',
} as const;
