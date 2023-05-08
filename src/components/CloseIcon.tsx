import { FC, MouseEventHandler } from "react"

interface CloseIconProps {
	onClickHandler: () => void
}

export const CloseIcon: FC<CloseIconProps> = ({ onClickHandler }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2.5}
			stroke="currentColor"
			className="w-9 h-9 bg-gray-300 rounded-full cursor-pointer p-1"
			onClick={(e) => onClickHandler()}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	)
}
