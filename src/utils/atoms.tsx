import { ActiveColorType, ColorsType, TimerSpecsType } from "@/types/types"
import { atom } from "jotai"

const timerSpecsAtom = atom<TimerSpecsType>({
	pomodoroTimerLength: 1500,
	shortBreakLength: 300,
	longBreakLength: 600,
})

const activeButtonAtom = atom<number>(1)

const timeLeftAtom = atom<number>(1500)
const isTimerRunningAtom = atom<boolean>(false)
const accentColorsAtom = atom<ColorsType>({
	red: "#F77070",
	blue: "#2F6C9E",
	pink: "#D81FF9",
})

const isModalShowingAtom = atom<boolean>(false)
const activeAccentColorAtom = atom<ActiveColorType>("red")
const getActiveAccentColorHexAtom = atom(
	(get) => get(accentColorsAtom)[get(activeAccentColorAtom)]
)

const activeFontAtom = atom<string>("font-poppins")

const progressAtom = atom((get) => {
	const pTimeLeft = get(timeLeftAtom)
	const pActiveButton = get(activeButtonAtom)
	const pTimerSpecs = get(timerSpecsAtom)
	const pTimerLength =
		pActiveButton === 1
			? pTimerSpecs.pomodoroTimerLength
			: pActiveButton === 2
			? pTimerSpecs.shortBreakLength
			: pTimerSpecs.longBreakLength

	return Math.round((pTimeLeft / pTimerLength) * 100 * 100) / 100
})

export {
	activeFontAtom,
	activeButtonAtom,
	isModalShowingAtom,
	timerSpecsAtom,
	isTimerRunningAtom,
	accentColorsAtom,
	activeAccentColorAtom,
	getActiveAccentColorHexAtom,
	progressAtom,
	timeLeftAtom,
}
