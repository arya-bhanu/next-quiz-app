"use client";
import { useEffect, useState } from "react";
import { axiosServerAuthConfig } from "../../config/axios.config";
import { Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "../loading";

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
				console.error(err);
				console.log("rendered");
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
		<div className="flex flex-col pt-12 mx-auto max-w-3xl">
			<h3 className="text-center text-2xl font-semibold mb-6">
				Your Scoreboard
			</h3>
			{!data ? (
				<Loading />
			) : (
				<Card className="h-full w-full overflow-y-scroll">
					<table className="w-full min-w-max table-auto text-left">
						<thead>
							<tr>
								{TABLE_HEAD.map((head) => (
									<th
										key={head}
										className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
									>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal leading-none opacity-70 text-center"
										>
											{head}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map(
								(
									{ createdAt, not_answered, score, wrong_answer, id },
									index
								) => {
									const isLast = index === data.length - 1;
									const classes = isLast
										? "p-4"
										: "p-4 border-b border-blue-gray-50";

									return (
										<tr key={id}>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal text-center"
												>
													{score}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal text-center"
												>
													{not_answered}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal text-center"
												>
													{wrong_answer}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal text-center"
												>
													{dateConvert(createdAt)}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													as="a"
													href="#"
													variant="small"
													color="blue-gray"
													className="font-medium text-center text-blue-700 hover:underline underline-offset-2"
												>
													Review
												</Typography>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				</Card>
			)}
		</div>
	);
};

export default Scoreboard;
