export interface Time {
	unix(): number
	iso(unixTime: number): string
	utc(unixTime: number): string
	ls(unixTime: number): string
	lts(unixTime: number): string
	lds(unixTime: number): string
}

export type TimeType = "unix" | "iso" | "utc" | "ls" | "lts" | "lds"
