const { ANSI_COLORS_STRINGS, SUCCESS_COLOR, FAILURE_COLOR, ANSI_RESET } = require('./colorPresets.js')


// #region ProgressBar

class ProgressBar {
	constructor(options) {
		this.total = options?.total ?? 100
		this.prefix = options?.prefix ? options.prefix + " " : ""
		this.postfix = options?.postfix ? " " + options.postfix : ""
		this.barColorCode = ANSI_COLORS_STRINGS[options?.barColor ?? "blue"]
	}

	update(progress, options) {
		// if (!this.updateDebounce) {
		// 	this.updateDebounce = debounce(this._update.bind(this), 5)
		// }
		// this.updateDebounce(progress, options)
		this._update(progress, options)
	}

	_update(progress, options) {
		hideCursor()
		this.set(options)
		const percent = (progress <= this.total ? progress / this.total : 1) * 100
		const barLength = 30

		const filledLength = Math.round((barLength * (progress <= this.total ? progress : this.total)) / this.total)

		const restLength = barLength - filledLength

		// const bar = "\u25A0".repeat(filledLength) + "\u25A1".repeat(restLength >= 0 ? restLength : 0) + ""
		const bar = "\u2588".repeat(filledLength) + "\u2591".repeat(restLength >= 0 ? restLength : 0) + ""
		// const bar = "=".repeat(filledLength) + " ".repeat(restLength >= 0 ? restLength : 0) + ""

		process.stdout.clearLine(-1)
		process.stdout.cursorTo(0)
		process.stdout.write(`${this.prefix}[${this.barColorCode}${bar}${ANSI_RESET}] ${percent.toFixed(2)}%`)
	}

	set(options) {
		if (options?.total) this.total = options.total
		if (options?.prefix) this.prefix = options.prefix + " "
		if (options?.postfix) this.postfix = " " + options.postfix
		if (options?.barColor) this.barColorCode = ANSI_COLORS_STRINGS[options?.barColor]
	}

	clear() {
		process.stdout.clearLine(-1)
		process.stdout.cursorTo(0)
	}

	finish(message, clearLine) {
		if (clearLine) {
			this.clear()
		} else {
			process.stdout.write("\n")
		}
		if (message) {
			process.stdout.write(`${message.trim()}\n`)
		}		
		showCursor()
	}

	ok(message, clearLine) {
		if (clearLine) {
			this.clear()
		} else {
			process.stdout.write("\n")
		}
		if (message) {
			process.stdout.write(`${SUCCESS_COLOR}${"✔"}${ANSI_RESET} ${message.trim()}`)
		} else {
			process.stdout.write(`${this.prefix}${SUCCESS_COLOR}${"✔"}${ANSI_RESET}${this.postfix}`)
		}
		process.stdout.write("\n")
		showCursor()
	}

	fail(message, clearLine) {
		if (clearLine) {
			this.clear()
		} else {
			process.stdout.write("\n")
		}
		if (message) {
			process.stdout.write(`${FAILURE_COLOR}${"✗"}${ANSI_RESET} ${message.trim()}`)
		} else {
			process.stdout.write(`${this.prefix}${FAILURE_COLOR}${"✗"}${ANSI_RESET}${this.postfix}`)
		}
		process.stdout.write("\n")
		showCursor()
	}
}

// #endregion


// #region ProcessSpin

class ProcessSpinner {
	constructor(options) {
		this.prefix = options?.prefix ? options.prefix + " " : ""
		this.postfix = options?.postfix ? " " + options.postfix : ""
		this.spinColorCode = ANSI_COLORS_STRINGS[options?.spinColor ?? "blue"]
		this.exitHandlerBound = this.exitHandler.bind(this)
	}

	update(options) {
		if (this.animating) return
		// if (!this.updateDebounce) {
		// 	this.updateDebounce = debounce(this._update.bind(this), 5)
		// }
		// this.updateDebounce(options)
		this._update(options)
	}

	_update(options) {
		this.set(options)
		this._print()
	}

	set(options) {
		if (options?.prefix) this.prefix = options.prefix + " "
		if (options?.postfix) this.postfix = " " + options.postfix
		if (options?.spinColor) this.spinColorCode = ANSI_COLORS_STRINGS[options?.spinColor]
	}

	animate(frequencyPerSecond) {
		let freq = frequencyPerSecond >= 1 && frequencyPerSecond <= 100 ? frequencyPerSecond : 10
		if (this.animating) return
		this.subscribeToProcessEvents()
		this.animating = true
		this.animateInterval = setInterval(() => {
			this._print()
		}, 1000 / freq)
	}

	stop() {
		if (this.animateInterval) {
			clearInterval(this.animateInterval)
			this.animating = false
		}
		this.unsubscribeFromProcessEvents()
	}

	clear() {
		if (this.animating) this.stop()
		process.stdout.clearLine(-1)
		process.stdout.cursorTo(0)
	}

	finish(message) {
		this.clear()
		if (message) {
			process.stdout.write(`${message.trim()}`)
		}
		process.stdout.write("\n")
		showCursor()
	}

	ok(message) {
		this.clear()
		if (message) {
			process.stdout.write(`${SUCCESS_COLOR}${"✔"}${ANSI_RESET} ${message.trim()}`)
		} else {
			process.stdout.write(`${this.prefix}${SUCCESS_COLOR}${"✔"}${ANSI_RESET}${this.postfix}`)
		}
		process.stdout.write("\n")
		showCursor()
	}

	fail(message) {
		this.clear()
		if (message) {
			process.stdout.write(`${FAILURE_COLOR}${"✗"}${ANSI_RESET} ${message.trim()}`)
		} else {
			process.stdout.write(`${this.prefix}${FAILURE_COLOR}${"✗"}${ANSI_RESET}${this.postfix}`)
		}
		process.stdout.write("\n")
		showCursor()
	}

	_print() {
		hideCursor()
		let newSpinFrame = spinFrames.length > this.spinFrame + 1 ? this.spinFrame + 1 : 0
		var spin = spinFrames[newSpinFrame]
		this.spinFrame = newSpinFrame
		process.stdout.clearLine(-1)
		process.stdout.cursorTo(0)
		process.stdout.write(`${this.prefix}${this.spinColorCode}${spin}${ANSI_RESET}${this.postfix}`)
	}

	subscribeToProcessEvents() {
		process.once("SIGINT", this.exitHandlerBound)
		process.once("SIGTERM", this.exitHandlerBound)
	}

	unsubscribeFromProcessEvents() {
		process.off("SIGINT", this.exitHandlerBound)
		process.off("SIGTERM", this.exitHandlerBound)
	}

	exitHandler(signal) {
		if (this.animating) {
			this.stop()
		}

		const exitCode = signal === "SIGINT" ? 130 : signal === "SIGTERM" ? 143 : 1
		process.exit(exitCode)
	}
}

// #endregion

// #region Utilities

function debounce(func, delay) {
	let timeoutId
	let invoked = false
	return function (...args) {
		invoked = true
		clearTimeout(timeoutId)

		timeoutId = setTimeout(
			() => {
				func(...args)
			},
			invoked ? delay : 0,
		)
	}
}

function hideCursor() {
	process.stdout.write("\x1B[?25l")
}

function showCursor() {
	process.stdout.write("\x1B[?25h")
}

const spinFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

// #endregion

module.exports = { ProgressBar, ProcessSpinner }