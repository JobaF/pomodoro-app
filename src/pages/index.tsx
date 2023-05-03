import ProgressCircle from "@/components/ProgressCircle"
import { SettingsIcon } from "@/components/SettingsIcon"

export default function Home() {
	const color = "red"
	const minutes = 20
	const seconds = 59

	return (
		<div className="font-poppins font-bold h-screen bg-violet-950 flex justify-center items-center">
			<div className="w-full lg:w-1/2 max-w-[700px] h-full flex flex-col items-center gap-10">
				{/* Heading */}
				<div className="w-full mt-10">
					<h1 className="text-2xl md:text-3xl text-center text-neutral-300">
						pomodoro
					</h1>
				</div>
				{/* Buttons */}
				<div className="w-4/5 h-14 rounded-full flex gap-2 bg-violet-900 text-gray-300">
					<button
						className={`w-1/3 h-full rounded-full ${
							color === "red" ? "hover:bg-red-500" : null
						} shadow-slate-500 drop-shadow-lg hover:shadow-inner hover:shadow-black`}
					>
						pomodoro
					</button>
					<button
						className={`w-1/3 h-full rounded-full ${
							color === "red" ? "hover:bg-red-500" : null
						} shadow-slate-500 drop-shadow-lg hover:shadow-inner hover:shadow-black`}
					>
						short break
					</button>
					<button
						className={`w-1/3 h-full rounded-full ${
							color === "red" ? "hover:bg-red-500" : null
						} shadow-slate-500 drop-shadow-lg hover:shadow-inner hover:shadow-black`}
					>
						long break
					</button>
				</div>
				{/* Counter */}
				<div className="relative w-full flex-col aspect-square bg-violet-900 rounded-full flex justify-center items-center">
					<ProgressCircle />
					<p className="text-[100px] text-neutral-300">
						{minutes + ":" + seconds}
					</p>
					<button className="absolute tracking-widest bottom-1/4 text-4xl text-neutral-300">
						PAUSE
					</button>
				</div>
				{/* Settings */}
				<div className="w-full flex items-center justify-center h-12">
					<SettingsIcon />
				</div>
			</div>
		</div>
	)
}
