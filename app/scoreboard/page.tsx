"use client";
import { useEffect, useState } from "react";
import { axiosServerAuthConfig } from "../../config/axios.config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "../loading";
import Link from "next/link";
type ScoreBoard = {
	id: string;
	createdAt: string;
	not_answered: number;
	score: number;
	wrong_answer: number;
};
const TABLE_HEAD = ["Score", "Not Answered", "Wrong Answer", "Date", ""];
const Scoreboard = () => {
	const router = useRouter();
	const [data, setData] = useState<ScoreBoard[] | null>(null);
	useEffect(() => {
		axiosServerAuthConfig
			.get("/user/scoreboard")
			.then((response) => {
				setData(response.data.data as ScoreBoard[]);
			})
			.catch((err: unknown) => {
				toast("You're not authenticated", { type: "warning" });
				router.push("/auth/login");
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function dateConvert(dateString: string) {
		const date = new Date(dateString);

		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		} as Intl.DateTimeFormatOptions;

		const formattedDate = date.toLocaleDateString("en-US", options);
		return formattedDate;
	}
	return (
		<div
			className={`flex flex-col pt-8 sm:pt-10 w-full lg:pt-12  ${
				data ? "mx-auto" : "m-auto"
			} max-w-3xl`}
		>
			<h3 className="text-center text-2xl font-semibold mb-6">
				{data ? "Your Scoreboard" : "Loading Your Scoreboard ..."}
			</h3>
			{!data ? (
				<Loading />
			) : (
				<div className="overflow-x-auto shadow-lg rounded-lg w-full max-h-[60vh] overflow-y-auto">
					<table className="min-w-full text-left text-sm font-light">
						<thead className="border-b sticky top-0 font-medium bg-neutral-300 dark:border-neutral-500">
							<tr className="sticky top-0">
								<th
									scope="col"
									className="px-6 py-4 sticky top-0 text-center"
								>
									Score
								</th>
								<th
									scope="col"
									className="px-6 py-4 sticky top-0 text-center"
								>
									Not Answered
								</th>
								<th
									scope="col"
									className="px-6 py-4 sticky top-0 text-center"
								>
									Wrong Answer
								</th>
								<th
									scope="col"
									className="px-6 py-4 sticky top-0 text-center"
								>
									Date
								</th>
								<th
									scope="col"
									className="px-6 py-4 sticky top-0 text-center"
								></th>
							</tr>
						</thead>
						<tbody>
							{data.map((el) => {
								return (
									<tr
										key={el.id}
										className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
									>
										<td className="whitespace-nowrap px-6 py-4 font-medium  text-center">
											{el.score}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-center">
											{el.not_answered}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-center">
											{el.wrong_answer}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-center">
											{dateConvert(el.createdAt)}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-center">
											<Link href={`/scoreboard/review/${el.id}`} className="hover:underline underline-offset-2 text-blue-600">Review</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Scoreboard;
