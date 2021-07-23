# Kibela Custom Template Chrome Extension

This Chrome extension extends [Kibela](https://kibe.la/)'s template variables to allow new template variables to be used.

## Kibela Default Template Variables

Kibea supports some [template variables](https://support.kibe.la/hc/ja/articles/360035045152-テンプレートを用意しよう).

| variable       | example  | exp |
| -------------- | -------- | --- |
| `%{year}`      | 2021     |     |
| `%{month}`     | 07       |     |
| `%{day}`       | 22       |     |
| `%{me}`        | kibe-san |     |
| `%{real_name}` | Kibe     |     |

### Calendar : 2021/07

| Sun | Mon | Tue | Wed |    Thu    | Fri | Sat |
| :-: | :-: | :-: | :-: | :-------: | :-: | :-: |
|     |     |     |     |     1     |  2  |  3  |
| 04  | 05  | 06  | 07  |     8     |  9  | 10  |
| 11  | 12  | 13  | 14  |    15     | 16  | 17  |
| 18  | 19  | 20  | 21  | 22(Today) | 23  | 24  |
| 25  | 26  | 27  | 28  |    29     | 30  | 31  |

## Chrome Extension Template Variables

This extension adds some template variables.

| variable          | example | description                       |
| ----------------- | ------- | --------------------------------- |
| `%{week}`         | 木      |                                   |
| `%{weekday}`      | 木曜日  |                                   |
| `%{day:+2d}`      | 24      | 2021/07/22 + 2 days               |
| `%{day:-1w}`      | 15      | 2021/07/22 - 1 week               |
| `%{day:=mon}`     | 19      | this monday                       |
| `%{day:+mon}`     | 26      | next monday                       |
| `%{day:+2w:=mon}` | 19      | the monday of the week after next |

This extension supports following custom template rule.

- `%{<rule>:<sign><value><unit>}`

### Rule Option

| rule    | sign   | value                       | unit    |
| ------- | ------ | --------------------------- | ------- |
| week    | \+ -   | number                      | y m d w |
|         | \+ - = | sun mon tue wed thu fri sat |         |
| weekday | \+ -   | number                      | y m d w |
|         | \+ - = | sun mon tue wed thu fri sat |         |
| day     | \+ -   | number                      | y m d w |
|         | \+ - = | sun mon tue wed thu fri sat |         |
| month   | \+ -   | number                      | y m d w |
|         | \+ - = | sun mon tue wed thu fri sat |         |
| year    | \+ -   | number                      | y m d w |
|         | \+ - = | sun mon tue wed thu fri sat |         |
