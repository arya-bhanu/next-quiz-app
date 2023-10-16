"use client";
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body className="min-h-screen flex items-center justify-center flex-col">
				<div className="px-5 py-7 bg-white shadow-xl flex flex-col items-center">
					<h2 className="font-semibold text-2xl">Something went wrong!</h2>
					<button
						onClick={() => reset()}
						className="bg-blue-800 px-3 py-1 mt-2 text-white"
					>
						Try again
					</button>
					<a
						href={"/"}
						className="bg-green-800 text-white px-3 py-1 mt-2 rounded-md"
					>
						Home
					</a>
				</div>
			</body>
		</html>
	);
}
