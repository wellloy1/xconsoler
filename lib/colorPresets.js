const ANSI_COLORS = {
  // Dark colors:
  dBlack: [0, 30],
  dRed: [0, 31],
  dGreen: [0, 32],
  dYellow: [0, 33],
  dBlue: [0, 34],
  dMagenta: [0, 35],
  dCyan: [0, 36],
  dWhite: [0, 37],

  // Bright colors:
  black: [1, 30],
  red: [1, 31],
  green: [1, 32],
  yellow: [1, 33],
  blue: [1, 34],
  magenta: [1, 35],
  cyan: [1, 36],
  white: [1, 37],
  default: [1, 39],

  // With background colors:
  bgRed: [30, 41],
  bgGreen: [30, 42],
  bgBlue: [30, 44],
  bgCyan: [30, 46],
	bgWhite: [30, 37],
};

const ANSI_COLORS_STRINGS = {
  // Dark colors:
  dBlack: createANSIColorMode([0, 30]),
  dRed: createANSIColorMode([0, 31]),
  dGreen: createANSIColorMode([0, 32]),
  dYellow: createANSIColorMode([0, 33]),
  dBlue: createANSIColorMode([0, 34]),
  dMagenta: createANSIColorMode([0, 35]),
  dCyan: createANSIColorMode([0, 36]),
  dWhite: createANSIColorMode([0, 37]),

  // Bright colors:
  black: createANSIColorMode([1, 30]),
  red: createANSIColorMode([1, 31]),
  green: createANSIColorMode([1, 32]),
  yellow: createANSIColorMode([1, 33]),
  blue: createANSIColorMode([1, 34]),
  magenta: createANSIColorMode([1, 35]),
  cyan: createANSIColorMode([1, 36]),
  white: createANSIColorMode([1, 37]),
  default: createANSIColorMode([1, 39]),

  // With background colors:
  bgRed: createANSIColorMode([30, 41]),
  bgGreen: createANSIColorMode([30, 42]),
  bgBlue: createANSIColorMode([30, 44]),
  bgCyan: createANSIColorMode([30, 46]),
  bgWhite: createANSIColorMode([30, 37]),
};


const ANSI_RESET = '\x1b[0;0m';

// Refers to ANSI_COLORS table
const TIMESTRING_COLOR = 'magenta';

const LOG_LEVEL_COLORS = {
  error: 'red',
  fatal: 'red',
  debug: 'green',
  trace: 'blue',
  info: 'blue',
  warn: 'yellow',
  log: 'cyan',
};

const FAILURE_COLOR = createANSIColorMode(ANSI_COLORS["red"]);
const SUCCESS_COLOR = createANSIColorMode(ANSI_COLORS["green"]);

function createANSIColorMode(ansiColorCode) {
  return '\x1b[' + ansiColorCode.join(';') + 'm';
}

module.exports = {
  ANSI_COLORS,
  ANSI_COLORS_STRINGS,
  ANSI_RESET,
  TIMESTRING_COLOR,
  LOG_LEVEL_COLORS,
  FAILURE_COLOR,
  SUCCESS_COLOR
}
