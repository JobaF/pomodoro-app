import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<title>Pomodoro App</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,700;1,800&display=swap"
					rel="stylesheet"
				/>
				<link rel="shortcut icon" href="/favicon.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
