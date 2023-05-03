import { FC } from "react"

interface ProgressCircleProps {}

const ProgressCircle: FC<ProgressCircleProps> = ({}) => {
	const radius = 50
	const stroke = 2
	const normalizedRadius = radius - stroke * 2
	const circumference = normalizedRadius * 2 * Math.PI
	const progress = 99
	const strokeDashoffset = circumference - (progress / 100) * circumference

	return (
		<svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			className="absolute"
		>
			<circle
				fill="transparent"
				strokeWidth={stroke}
				stroke="rgb(239, 68, 68)"
				cx={radius}
				cy={radius}
				r={normalizedRadius}
				strokeDasharray={circumference + " " + circumference}
				style={{
					strokeDashoffset,
					transition: "stroke-dashoffset 1s",
					transform: "rotate(-90deg)",
					transformOrigin: "50% 50%",
				}}
			/>
		</svg>
	)
}

export default ProgressCircle
