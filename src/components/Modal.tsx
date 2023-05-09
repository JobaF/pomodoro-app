import { ChangeEvent, FC, useState } from "react"
import { CloseIcon } from "./CloseIcon"
import {
	activeAccentColorAtom,
	timerSpecsAtom,
	activeFontAtom,
	isModalShowingAtom,
	activeButtonAtom,
	timeLeftAtom,
} from "@/utils/atoms"
import { useAtom, useAtomValue } from "jotai"
import { CheckIcon } from "./CheckIcon"

interface ModalProps {}

export const Modal: FC<ModalProps> = ({}) => {
	const [timerSpecs, setTimerSpecs] = useAtom(timerSpecsAtom)
	const [activeColor, setActiveColor] = useAtom(activeAccentColorAtom)
	const [activeFont, setActiveFont] = useAtom(activeFontAtom)
	const [, setIsModalShowing] = useAtom(isModalShowingAtom)
	const activeButton = useAtomValue(activeButtonAtom)
	const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom)

	const [pomodoroSpecs, setPomodoroSpecs] = useState({
		pomodoroTimerLength: (timerSpecs.pomodoroTimerLength / 60).toString(),
		shortBreakLength: (timerSpecs.shortBreakLength / 60).toString(),
		longBreakLength: (timerSpecs.longBreakLength / 60).toString(),
	})
	const tailwindAccentColor =
		activeColor === "red"
			? "bg-pomodoroRed"
			: activeColor === "blue"
			? "bg-pomodoroBlue"
			: "bg-pomodoroPink"
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.currentTarget.value
			? event.currentTarget.value.toString()
			: ""
		console.log(inputValue)
		const inputName = event.target.name

		if (inputName === "pomodoroTimer") {
			setPomodoroSpecs((prev) => ({
				...prev,
				pomodoroTimerLength: inputValue,
			}))
		} else if (inputName === "shortBreakTimer") {
			setPomodoroSpecs((prev) => ({
				...prev,
				shortBreakLength: inputValue,
			}))
		} else {
			setPomodoroSpecs((prev) => ({
				...prev,
				longBreakLength: inputValue,
			}))
		}
	}

	const applyTimes = () => {
		if (
			!isNaN(parseInt(pomodoroSpecs.pomodoroTimerLength)) &&
			!isNaN(parseInt(pomodoroSpecs.shortBreakLength)) &&
			!isNaN(parseInt(pomodoroSpecs.longBreakLength)) &&
			parseInt(pomodoroSpecs.pomodoroTimerLength) > 0 &&
			parseInt(pomodoroSpecs.pomodoroTimerLength) < 100 &&
			parseInt(pomodoroSpecs.shortBreakLength) > 0 &&
			parseInt(pomodoroSpecs.shortBreakLength) < 100 &&
			parseInt(pomodoroSpecs.longBreakLength) > 0 &&
			parseInt(pomodoroSpecs.longBreakLength) < 100
		) {
			setTimerSpecs({
				pomodoroTimerLength: parseInt(pomodoroSpecs.pomodoroTimerLength) * 60,
				shortBreakLength: parseInt(pomodoroSpecs.shortBreakLength) * 60,
				longBreakLength: parseInt(pomodoroSpecs.longBreakLength) * 60,
			})

			if (activeButton === 1) {
				setTimeLeft(parseInt(pomodoroSpecs.pomodoroTimerLength) * 60)
			} else if (activeButton === 2) {
				setTimeLeft(parseInt(pomodoroSpecs.shortBreakLength) * 60)
			} else {
				setTimeLeft(parseInt(pomodoroSpecs.longBreakLength) * 60)
			}
		}
		setIsModalShowing(false)
	}
	return (
		<>
			<div
				onClick={() => setIsModalShowing(false)}
				className="h-full w-full absolute z-10 bg-black opacity-70"
			></div>
			<div className="absolute bg-neutral-100 z-20 w-2/5 opacity-100 rounded-xl flex flex-col items-center">
				{/* Heading and close button */}
				<div className="w-full flex justify-between items-center p-10">
					<h1 className="text-3xl">Settings</h1>
					<CloseIcon onClickHandler={() => setIsModalShowing(false)} />
				</div>
				<hr className="bg-gray-300 opacity-50 dark:opacity-50 w-full h-0.5" />

				{/* Three time inputs */}
				<div className="w-full h-12 pl-10 pt-5 tracking-widest">
					{"TIME (MINUTES)"}
				</div>
				<div className="w-full flex justify-center gap-10 mt-4 px-10 md:flex-row ">
					<div className="flex w-1/3 flex-col justify-center items-start gap-3 ">
						<label className="text-xs text-gray-400" htmlFor="pomodoroTimer">
							pomodoro
						</label>
						<input
							onChange={handleChange}
							name="pomodoroTimer"
							type="number"
							className="pl-10 rounded-lg drop-shadow-md text-sm w-full h-9 bg-gray-300"
							value={pomodoroSpecs.pomodoroTimerLength}
						/>
					</div>
					<div className="flex w-1/3 flex-col justify-center items-start gap-3">
						<label className="text-xs text-gray-400" htmlFor="shortBreakTimer">
							short break
						</label>
						<input
							onChange={handleChange}
							name="shortBreakTimer"
							type="number"
							className="pl-10 rounded-lg drop-shadow-md text-sm w-full h-9 bg-gray-300"
							value={pomodoroSpecs.shortBreakLength}
						/>
					</div>
					<div className="flex w-1/3 flex-col justify-center items-start gap-3">
						<label className="text-xs text-gray-400" htmlFor="longBreakTimer">
							long break
						</label>
						<input
							onChange={handleChange}
							name="longBreakTimer"
							type="number"
							className="pl-10 rounded-lg drop-shadow-md text-sm w-full h-9 bg-gray-300"
							value={pomodoroSpecs.longBreakLength}
						/>{" "}
					</div>
				</div>
				<hr className=" mt-7 ml-10 mr-10 bg-gray-300 opacity-50 dark:opacity-50 w-5/6 h-0.5" />
				{/* Font selection */}
				<div className="w-full p-10 flex justify-between items-center">
					<p className="tracking-widest">FONT</p>
					<div className="flex gap-5">
						<button
							onClick={() => setActiveFont("font-poppins")}
							className={` ${
								activeFont === "font-poppins"
									? "bg-black text-white"
									: "bg-gray-300"
							} h-10 w-10  rounded-full flex justify-center items-center font-poppins`}
						>
							Aa
						</button>
						<button
							onClick={() => setActiveFont("font-serif")}
							className={`${
								activeFont === "font-serif"
									? "bg-black text-white"
									: "bg-gray-300"
							} h-10 w-10 rounded-full flex justify-center items-center font-serif`}
						>
							Aa
						</button>
						<button
							onClick={() => setActiveFont("font-mono")}
							className={`${
								activeFont === "font-mono"
									? "bg-black text-white"
									: "bg-gray-300"
							} h-10 w-10  rounded-full flex justify-center items-center font-mono`}
						>
							Aa
						</button>
					</div>
				</div>
				<hr className="ml-10 mr-10 bg-gray-300 opacity-50 dark:opacity-50 w-5/6 h-0.5" />

				{/* Color selection */}
				<div className="w-full p-10 flex justify-between items-center mb-10">
					<p className="tracking-widest">COLOR</p>
					<div className="flex gap-5">
						<button
							className="h-10 w-10 bg-pomodoroRed rounded-full flex justify-center items-center"
							onClick={() => setActiveColor("red")}
						>
							{activeColor === "red" && <CheckIcon />}
						</button>
						<button
							onClick={() => setActiveColor("blue")}
							className="h-10 w-10 bg-pomodoroBlue rounded-full flex justify-center items-center"
						>
							{activeColor === "blue" && <CheckIcon />}
						</button>
						<button
							onClick={() => setActiveColor("pink")}
							className="h-10 w-10 bg-pomodoroPink rounded-full flex justify-center items-center"
						>
							{activeColor === "pink" && <CheckIcon />}
						</button>
					</div>
				</div>
				<button
					onClick={applyTimes}
					className={`${tailwindAccentColor} h-12 absolute -bottom-5 z-50 sm:w-24 text-white w-1/3 rounded-xl`}
				>
					Apply
				</button>
			</div>
		</>
	)
}
