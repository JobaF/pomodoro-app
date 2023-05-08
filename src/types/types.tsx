type Buttons = {
	id: number
	text: string
}

type Timers = {
	pomodoroTimerInSeconds: number
	shortBreakTimerInSeconds: number
	longBreakTimerInSeconds: number
}

type TimerSpecsType = {
	pomodoroTimerLength: number
	shortBreakLength: number
	longBreakLength: number
}

type ColorsType = {
	red: string
	blue: string
	pink: string
}
type ActiveColorType = "red" | "blue" | "pink"

export {
	type Buttons,
	type Timers,
	type TimerSpecsType,
	type ColorsType,
	type ActiveColorType,
}
