"use client";
import Link from "next/link";
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
				<h2>Something went wrong!</h2>
				<button
					onClick={() => reset()}
					className="bg-blue-700 px-3 py-1 mt-2"
				>
					Try again
				</button>
				<Link
					href={"/"}
					className="bg-green-800 text-white px-3 py-1 mt-2 rounded-md"
				>
					Home
				</Link>
			</body>
		</html>
	);
}
