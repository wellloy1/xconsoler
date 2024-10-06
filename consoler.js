// Simple terminal logger
// Version: 1.3.0
// Author: Max Shane <wellloy1@gmail.com>
const SonicBoom = require("sonic-boom")
const LOG_LEVELS = require("./lib/logLevels.js")
const DEFAULT_OPTIONS = require("./lib/defaultOptions.js")
const optionsValidators = require("./lib/optionsValidators.js")
const formatter = require("./lib/formatter.js")
const { formatterColored, formatterColored2 } = require("./lib/formatterColored.js")
const { ANSI_COLORS } = require("./lib/colorPresets.js")
const createTime = require("./lib/createTime.js")
const validateOptions = require("./lib/validateOptions.js")
const { ProcessSpinner, ProgressBar } = require("./lib/ProcessProgress.js")

const _print = Symbol()
const _options = Symbol()
const _formatter = Symbol()
const _streams = Symbol()
const _Time = Symbol()
const _write = Symbol()

class Consoler {
	static SonicBoom = SonicBoom

	static progress(options) {
		return new ProgressBar(options)
	}

	static spinner(options) {
		return new ProcessSpinner(options)
	}

	progress(options) {
		return new ProgressBar(options)
	}

	spinner(options) {
		return new ProcessSpinner(options)
	}

	constructor(options = {}) {
		const Time = createTime(options.locale)
		this[_Time] = Time
		const OPTIONS_VALIDATORS = optionsValidators(LOG_LEVELS, ANSI_COLORS, Time)
		const message = validateOptions(options, OPTIONS_VALIDATORS)
		if (message !== "") throw Error(`Cannot instantiate "Consoler": \n\n${message}`)
		this[_options] = Object.assign({}, DEFAULT_OPTIONS)
		Object.assign(this[_options], options)

		// Time configuration
		// @ts-ignore
		if (this[_options].time === 1 || this[_options].time === true) {
			this[_options].time = DEFAULT_OPTIONS.time
		}

		// Log levels configuration:
		const activeLevels = this[_options].levels
		const levelsCount = Object.keys(activeLevels).length
		let atLeastOneTrueActiveLevel = false

		for (const logLevel in LOG_LEVELS) {
			if (levelsCount === 0) {
				activeLevels[logLevel] = false
			} else if ([1, true].includes(activeLevels[logLevel])) {
				activeLevels[logLevel] = true
				atLeastOneTrueActiveLevel = true
			}
		}

		for (const logLevel in LOG_LEVELS) {
			if (levelsCount === 0) {
				break
			} else if ([1, true].includes(activeLevels[logLevel])) {
				activeLevels[logLevel] = LOG_LEVELS[logLevel]
			} else if (activeLevels[logLevel] === undefined) {
				activeLevels[logLevel] = !atLeastOneTrueActiveLevel
			} else {
				activeLevels[logLevel] = false
			}
		}

		// Levels tag configuration:
		let atLeastOneTrueLevelTag = false
		const levelsTag = this[_options].levelsTag
		const levelsTagCount = Object.keys(levelsTag).length

		for (const logLevel in LOG_LEVELS) {
			if (levelsTagCount === 0) {
				levelsTag[logLevel] = false
			} else if ([1, true].includes(levelsTag[logLevel])) {
				levelsTag[logLevel] = true
				atLeastOneTrueLevelTag = true
			}
		}

		for (const logLevel in LOG_LEVELS) {
			if (levelsTagCount === 0) {
				break
			} else if ([1, true].includes(levelsTag[logLevel])) {
				levelsTag[logLevel] = LOG_LEVELS[logLevel]
			} else if (levelsTag[logLevel] === undefined) {
				levelsTag[logLevel] = !atLeastOneTrueLevelTag
			} else {
				levelsTag[logLevel] = false
			}
		}

		this[_options].levelsTag = levelsTag

		// Create log methods:
		for (const logLevel in activeLevels) {
			if (logLevel === "debug") continue
			if (activeLevels[logLevel]) {
				this[logLevel] = (...args) => {
					this[_print](logLevel, args)
				}
			} else this[logLevel] = function noop() {}
		}

		// Formatter configuration:
		if (this[_options].colors) {
			if (this[_options].timeColor) this[_formatter] = formatterColored
			else this[_formatter] = formatterColored2
		} else {
			this[_formatter] = formatter
		}

		// Stream type configuration:
		if (!this[_options].streams) {
			const opts = { fd: 1 }
			if (this[_options].sync) opts.sync = true
			// @ts-ignore
			this[_streams] = [new SonicBoom(opts)]
		} else {
			this[_streams] = this[_options].streams
		}

		// Assigning other the Node.js console methods which not implemented yet
		this.assert = console.assert
		this.clear = console.clear
		this.count = console.count
		this.countReset = console.countReset
		this.dir = console.dir
		this.dirxml = console.dirxml
		this.group = console.group
		this.groupCollapsed = console.groupCollapsed
		this.groupEnd = console.groupEnd
		this.table = console.table
		this.time = console.time
		this.timeEnd = console.timeEnd
		this.timeLog = console.timeLog
		this.trace = console.trace
		this.Console = Consoler
		this.timeStamp = console.timeStamp
		this.profile = console.profile
		this.profileEnd = console.profileEnd
	}

	[_print](logLevel, args) {
		if (!this[_options].active) return

		let printLine = ""

		if (this[_options].time) {
			const timeString = this[_Time][this[_options].time]()
			printLine += this[_formatter].time(timeString, this[_options].timeColor)
			printLine += " "
		}

		if (this[_options].tag) {
			printLine += this[_formatter].tag(this[_options].tag, this[_options].tagColor)
			printLine += " "
		}

		if (this[_options].levelsTag[logLevel]) {
			printLine += this[_formatter].level(logLevel)
			printLine += " "
		}

		if (this[_options].prefix) {
			printLine += this[_options].prefix
			printLine += " "
		}

		while (args.length > 0) {
			printLine += this[_formatter].args(args.shift())
			printLine += " "
		}

		this[_write](printLine + "\n")
	}

	[_write](str) {
		for (const stream of this[_streams]) {
			stream.write(str)
		}
	}

	debug(...args) {
		const copy = [...args]
		if (this[_options].levels.debug) this[_print]("debug", args)
		return copy[0]
	}
}

module.exports = Consoler
