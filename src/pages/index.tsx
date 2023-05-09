import { Modal } from "@/components/Modal"
import ProgressCircle from "@/components/ProgressCircle"
import { SettingsIcon } from "@/components/SettingsIcon"
import {
	getLeftOverSeconds,
	getMinutesFromSeconds,
} from "@/utils/timeCalculations"
import { useEffect, useRef, useState } from "react"
import { useAtom, useAtomValue } from "jotai"
import {
	isTimerRunningAtom,
	timerSpecsAtom,
	activeAccentColorAtom,
	getActiveAccentColorHexAtom,
	isModalShowingAtom,
	progressAtom,
	timeLeftAtom,
	activeButtonAtom,
	activeFontAtom,
} from "@/utils/atoms"
import { Buttons } from "@/types/types"

export default function Home() {
	const activeAccentColor = useAtomValue(activeAccentColorAtom)
	const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom)
	const hexAccentColor = useAtomValue(getActiveAccentColorHexAtom)
	const tailwindAccentColor =
		activeAccentColor === "red"
			? "bg-pomodoroRed"
			: activeAccentColor === "blue"
			? "bg-pomodoroBlue"
			: "bg-pomodoroPink"
	const timerSpecs = useAtomValue(timerSpecsAtom)
	const intervalRef = useRef<NodeJS.Timer>()
	const progress = useAtomValue(progressAtom)
	const [activeButton, setActiveButton] = useAtom(activeButtonAtom)
	const [isTimerRunning, setIsTimerRunning] = useAtom(isTimerRunningAtom)
	const [showModal, setShowModal] = useAtom(isModalShowingAtom)
	const buttons: Buttons[] = [
		{ id: 1, text: "pomodoro" },
		{ id: 2, text: "short break" },
		{ id: 3, text: "long break" },
	]
	const activeFont = useAtomValue(activeFontAtom)
	useEffect(() => {
		return () => clearInterval(intervalRef.current)
	}, [])
	useEffect(() => {
		if (timeLeft === 0 && intervalRef.current) {
			clearInterval(intervalRef.current)
			setIsTimerRunning(false)
		}
	}, [timeLeft])

	const handleTimerStart = () => {
		if (isTimerRunning) {
			clearInterval(intervalRef.current)
			setIsTimerRunning(false)
		} else {
			intervalRef.current = setInterval(() => {
				setTimeLeft((prev) => (prev >= 0.1 ? prev - 0.1 : 0))
			}, 100)
			setIsTimerRunning(true)
		}
	}
	const clickButton = (id: number) => {
		setActiveButton(id)
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			setIsTimerRunning(false)
		}
		if (id === 1) {
			setActiveButton(1)
			setTimeLeft(timerSpecs.pomodoroTimerLength)
		} else if (id === 2) {
			setActiveButton(2)
			setTimeLeft(timerSpecs.shortBreakLength)
		} else {
			setActiveButton(3)
			setTimeLeft(timerSpecs.longBreakLength)
		}
	}
	return (
		<div
			className={`${activeFont} font-bold h-screen bg-violet-950 flex justify-center items-center`}
		>
			{showModal && <Modal />}
			<div className="w-full xl:w-1/2 max-w-[700px] h-full flex flex-col items-center sm:gap-10 gap-4">
				{/* Heading */}
				<div className="w-full mt-10">
					<h1 className="text-2xl md:text-3xl text-center text-neutral-300">
						pomodoro
					</h1>
				</div>
				{/* Buttons */}
				<div className="p-1 sm:w-1/2 text-sm w-3/4 h-12 rounded-full flex gap-2 bg-violet-900 text-gray-300">
					{buttons.map((button, i) => (
						<button
							key={i}
							onClick={() => clickButton(button.id)}
							className={`w-1/3 h-full rounded-full ${
								activeButton === button.id
									? `${tailwindAccentColor} shadow-inner shadow-black`
									: ""
							}  drop-shadow-lg ${
								activeButton !== button.id &&
								"hover:shadow-inner hover:shadow-black"
							} `}
						>
							{button.text}
						</button>
					))}
				</div>
				{/* Counter */}
				<div className="relative w-96 h-96 flex-col flex justify-center items-center">
					<ProgressCircle
						stroke={2}
						progress={progress}
						strokeColor={hexAccentColor}
					/>
					<p className="absolute text-7xl text-neutral-300">
						{getMinutesFromSeconds(timeLeft) +
							":" +
							getLeftOverSeconds(timeLeft)}
					</p>
					<button
						onClick={handleTimerStart}
						className={`${
							isTimerRunning
								? `${tailwindAccentColor}`
								: "border border-gray-400"
						} absolute p-1 rounded-md drop-shadow-xl hover:shadow-inner hover:shadow-black bottom-1/4 text-xl text-neutral-300`}
					>
						{isTimerRunning ? "P A U S E" : "S T A R T"}
					</button>
				</div>
				{/* Settings */}
				<div className="w-full flex items-center justify-center h-12">
					<SettingsIcon
						onClick={() => {
							if (intervalRef.current) {
								clearInterval(intervalRef.current)
								setIsTimerRunning(false)
							}
							setShowModal(true)
						}}
						strokeColor={hexAccentColor}
					/>
				</div>
			</div>
		</div>
	)
}
