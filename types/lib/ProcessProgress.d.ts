export type ProgressBarOptionsType = {
	total?: number
	prefix?: string
	postfix?: string
	barColor?: ANSI_COLORS
}

export type ProcessSpinOptionsType = {
	prefix?: string
	postfix?: string
	spinColor?: ANSI_COLORS
}

export declare class ProgressBar {
	total: number
	prefix?: string
	postfix?: string

	private updateDebounce: any
	private barColorCode: string

	constructor(options: ProgressBarOptionsType)

	update(progress: number, options?: ProgressBarOptionsType): void

	private _update(progress: number, options?: ProgressBarOptionsType): void

	set(options?: ProgressBarOptionsType): void

	clear(): void

	finish(message?: string, clear?: boolean): void

	ok(message?: string, clear?: boolean): void

	fail(message?: string, clear?: boolean): void
}

export declare class ProcessSpinner {
	prefix?: string
	postfix?: string

	private spinFrame: number = 0
	private updateDebounce: any
	private spinColorCode: string
	private animating: boolean = false
	private animateInterval: any
	private exitHandlerBound: any

	constructor(options: ProcessSpinOptionsType)

	update(options?: ProcessSpinOptionsType): void

	private _update(options?: ProcessSpinOptionsType): void

	set(options?: ProcessSpinOptionsType): void

	animate(frequencyPerSecond: number = 10)

	stop()

	clear(): void

	finish(message?: string): void

	ok(message?: string): void

	fail(message?: string): void

	private _print()

	private subscribeToProcessEvents()

	private unsubscribeFromProcessEvents()

	private exitHandler(signal: string)
}
