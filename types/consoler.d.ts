import type { logLevelsType } from './lib/logLevelsType'
import type { TimeType } from './lib/createTime'
import type { ANSI_COLORS } from './lib/colorPresets'
import type { ProgressBarOptionsType, ProcessSpinOptionsType } from './lib/ProcessProgress'
import { ProgressBar, ProcessSpinner } from './lib/ProcessProgress'

import SonicBoom from 'sonic-boom'

type Bool = 0 | 1 | true | false;

type Stream = {
	write()
	pipe()
}

type LoggerOptions = {
  active?: Bool;
  prefix?: string | number;
	tag?: string | number;
	tagColor?: ANSI_COLORS;
  levels?: logLevelsType;
	levelsTag?: logLevelsType;
  time?: TimeType | Bool;
  colors?: Bool;
  timeColor?: ANSI_COLORS | false | 0;
	locale?: string;
	sync?: Bool;
	streams?: {};
}

export default class Consoler {
	static SonicBoom = SonicBoom
  constructor(options?: LoggerOptions) {
    this._options = options;
  }

  static progress(options?: ProgressBarOptionsType): ProgressBar
  static spinner(options?: ProcessSpinOptionsType): ProcessSpinner

  progress(options?: ProgressBarOptionsType): ProgressBar
  spinner(options?: ProcessSpinOptionsType): ProcessSpinner

  log(...args: any): void;
  warn(...args: any): void;
  debug(...args: any): any;
  info(...args: any): void;
  fatal(...args: any): void;
  error(...args: any): void;

  assert(...args: any): void;
  clear(...args: any): void;
  count(...args: any): void;
  countReset(...args: any): void;
  dir(...args: any): void;
  dirxml(...args: any): void;
  group(...args: any): void;
  groupCollapsed(...args: any): void;
  groupEnd(...args: any): void;
  table(...args: any): void;
  time(...args: any): void;
  timeEnd(...args: any): void;
  timeLog(...args: any): void;
  trace(...args: any): void;

  Console(...args: any): void;
  timestamp(...args: any): void;
  profile(...args: any): void;
  profileEnd(...args: any): void;
}
