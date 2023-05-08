import { FC } from "react"
import { CloseIcon } from "./CloseIcon"
import { POMDORO_TIMER_IN_SECONDS } from "@/constants/constants"
import {
	activeAccentColorAtom,
	timerSpecsAtom,
	activeFontAtom,
	isModalShowingAtom,
} from "@/utils/atoms"
import { useAtom, useAtomValue } from "jotai"
import { CheckIcon } from "./CheckIcon"
import { ActiveColorType } from "@/types/types"

interface ModalProps {}

export const Modal: FC<ModalProps> = ({}) => {
	const [timerSpecs, setTimerSpecs] = useAtom(timerSpecsAtom)
	const [activeColor, setActiveColor] = useAtom(activeAccentColorAtom)
	const [activeFont, setActiveFont] = useAtom(activeFontAtom)
	const [, setIsModalShowingAtom] = useAtom(isModalShowingAtom)
	return (
		<>
			<div
				onClick={() => setIsModalShowingAtom(false)}
				className="h-full w-full absolute z-10 bg-black opacity-70"
			></div>
			<div className="absolute bg-neutral-100 z-20 w-2/5 opacity-100 rounded-xl flex flex-col overflow-hidden items-center">
				{/* Heading and close button */}
				<div className="w-full flex justify-between items-center p-10">
					<h1 className="text-3xl">Settings</h1>
					<CloseIcon onClickHandler={() => setIsModalShowingAtom(false)} />
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
							name="pomodoroTimer"
							type="number"
							className="pl-10 rounded-lg drop-shadow-md text-sm w-full h-9 bg-gray-300"
							value={timerSpecs.pomodoroTimerLength / 60}
						/>
					</div>
					<div className="flex w-1/3 flex-col justify-center items-start gap-3">
						<label className="text-xs text-gray-400" htmlFor="shortBreakTimer">
							short break
						</label>
						<input
							name="shortBreakTimer"
							type="number"
							className="pl-10 rounded-lg drop-shadow-md text-sm w-full h-9 bg-gray-300"
							value={timerSpecs.shortBreakLength / 60}
						/>
					</div>
					<div className="flex w-1/3 flex-col justify-center items-start gap-3">
						<label className="text-xs text-gray-400" htmlFor="longBreakTimer">
							long break
						</label>
						<input
							name="longBreakTimer"
							type="number"
							className="pl-10 rounded-lg drop-shadow-md text-sm w-full h-9 bg-gray-300"
							value={timerSpecs.longBreakLength / 60}
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
				<div className="w-full p-10 flex justify-between items-center">
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
			</div>
		</>
	)
}
