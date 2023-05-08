import { FC } from "react"
import { CloseIcon } from "./CloseIcon"
import { POMDORO_TIMER_IN_SECONDS } from "@/constants/constants"

interface ModalProps {}

export const Modal: FC<ModalProps> = ({}) => {
	return (
		<>
			<div className="h-full w-full absolute z-10 bg-black opacity-70"></div>
			<div className="h-3/4 absolute bg-neutral-100 z-20 w-2/5 opacity-100 rounded-lg flex flex-col overflow-hidden">
				{/* Heading and close button */}
				<div className="w-full flex justify-between items-center p-10">
					<h1 className="text-3xl">Settings</h1>
					<CloseIcon />
				</div>
				<hr className="bg-gray-300 opacity-50 dark:opacity-50 w-full h-0.5" />

				{/* Three time inputs */}
				<div className="w-full h-12 pl-10 pt-5">{"TIME (MINUTES)"}</div>
				<input type="number" value={POMDORO_TIMER_IN_SECONDS / 60} />
				{/* Font selection */}
				{/* Color selection */}
			</div>
		</>
	)
}
