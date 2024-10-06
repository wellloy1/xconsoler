const util = require("util")

const { ANSI_COLORS, ANSI_COLORS_STRINGS, ANSI_RESET, LOG_LEVEL_COLORS, TIMESTRING_COLOR } = require("./colorPresets.js")

const types = {
	string: (arg) => arg,
	number: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	function: (arg) => arg,
	boolean: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	bigint: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	symbol: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	object: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	array: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	undefined: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
	null: (arg) => util.formatWithOptions({ colors: true }, "%O", arg),
}

function argFormatter(arg) {
	let type = undefined
	if (Array.isArray(arg)) type = "array"
	else if (arg === null) type = "null"
	else type = typeof arg
	return types[type](arg)
}

const formatterColored = {
	time: (timeString, color) => {
		return ANSI_COLORS_STRINGS[color] + timeString + ANSI_RESET
	},
	tag: (tag, color) => {
		return ANSI_COLORS_STRINGS[color] + "[" + tag + "]" + ANSI_RESET
	},
	level: (logLevel) => {
		const color = LOG_LEVEL_COLORS[logLevel]
		return ANSI_COLORS_STRINGS[color] + "[" + logLevel + "]" + ANSI_RESET
	},
	args: (arg) => {
		return argFormatter(arg)
	},
}

const formatterColored2 = {
	time: (timeString) => timeString,
	tag: (tag, color) => {
		return ANSI_COLORS_STRINGS[color] + "[" + tag + "]" + ANSI_RESET
	},
	level: (logLevel) => {
		const color = LOG_LEVEL_COLORS[logLevel]
		return ANSI_COLORS_STRINGS[color] + "[" + logLevel + "]" + ANSI_RESET
	},
	args: (arg) => {
		return argFormatter(arg)
	},
}

module.exports = { formatterColored, formatterColored2 }
