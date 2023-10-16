import Link from "next/link";
import Image from "next/image";
import pic404 from "../public/img/404.png";
export default function NotFound() {
	return (
		<div className="min-h-[91vh] sm:min-h-[90vh] flex items-center">
			<div className="w-fit mx-auto flex flex-col gap-y-4 bg-white px-10 py-8 rounded-lg shadow-lg">
				<h2 className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold">404 Not Found</h2>
				<Image
					src={pic404}
					alt="404 pic"
                    width={300}
                    height={200}
				/>
				<p className="text-center text-lg">Could not find requested resource</p>
				<Link
					href="/"
					className="w-fit mx-auto block bg-green-600 hover:bg-green-700 transition-all duration-200 px-2 py-1.5 rounded-md text-white"
				>
					Return Home
				</Link>
			</div>
		</div>
	);
}
