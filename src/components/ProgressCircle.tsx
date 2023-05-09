import { FC } from "react"

interface ProgressCircleProps {
	stroke: number
	progress: number
	strokeColor: string
}

const ProgressCircle: FC<ProgressCircleProps> = ({
	stroke,
	progress,
	strokeColor,
}) => {
	const RADIUS = 50
	const normalizedRadius = RADIUS - stroke * 2
	const circumference = normalizedRadius * 2 * Math.PI
	const strokeDashoffset = circumference - (progress / 100) * circumference

	return (
		<svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			className="w-80 h-80 sm:h-full sm:w-full rounded-full bg-violet-900"
		>
			<circle
				fill="transparent"
				strokeWidth={stroke}
				stroke={strokeColor}
				cx={RADIUS}
				cy={RADIUS}
				r={normalizedRadius}
				strokeDasharray={circumference + " " + circumference}
				style={{
					strokeDashoffset,
					transition: "stroke-dashoffset 0.1s ease-in",
					transform: "rotate(-90deg)",
					transformOrigin: "50% 50%",
				}}
			/>
		</svg>
	)
}

export default ProgressCircle
