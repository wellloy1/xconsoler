# Description

Node.js pretty and fast TTY logger with nice settings

![screenshot](https://github.com/wellloy1/consoler/example/master/screenshot.jpg?raw=true)

# Dependencies

Only 'sonic-boom'

# Usage

```ts
import { Consoler } from '../consoler.js';

const consoler = new Consoler({
  levels: { log: true }, // enables "log" log level only *  the other log levels will be a noop function
  time: false, // disables time output
  colors: false, // disable ANSI color styles
});
```

```ts
interface Time {
  unix(): number; // UNIX epoch
  iso(unixTime: number): string; // ISO string
  utc(unixTime: number): string; // UTC string
  ls(unixTime: number): string; // localeString
  lts(unixTime: number): string; // localeTimeString
  lds(unixTime: number): string; // localeDateString
}

type logLevelsType = {
  [key: string]: 0 | 1 | true | false;
  log?: 0 | 1 | true | false;
  debug?: 0 | 1 | true | false;
  info?: 0 | 1 | true | false;
  warn?: 0 | 1 | true | false;
  error?: 0 | 1 | true | false;
  fatal?: 0 | 1 | true | false;
};

interface LoggerOptions {
  active?: 0 | 1 | true | false;
  prefix?: string;
  levels?: logLevelsType;
  time?: TimeType | null | 0 | false;
  colors?: 0 | 1 | true | false;
}
```
