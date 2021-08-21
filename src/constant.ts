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
  input: '.editor-titleBox-input',
  preview: '.editor-titleBox-preview span',
} as const;

// export class Multilines {
//   private getBar() {}

//   public getFoo(a: number, b: number, _: any) {
//     return a + b;
//   }
// }
