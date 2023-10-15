"use client";
import React, { useEffect, useState } from "react";
import { axiosServerAuthConfig } from "@/config/axios.config";
import { List, ListItem, Card } from "@material-tailwind/react";
import ReviewCard from "./(components)/ReviewCard";

type ResponseReviewDataType = {
	id: string;
	data_question_review: {
		index: number;
		answered: string;
		correct: string;
		question: string;
	}[];
};
const ReviewPage = ({ params }: { params: { id: string } }) => {
	const [data, setData] = useState<ResponseReviewDataType | null>(null);
	useEffect(() => {
		axiosServerAuthConfig
			.get(`/user/scoreboard/review/${params.id}`)
			.then((res) => {
				const arrayParsed = JSON.parse(res.data.data_question_review);
				setData({
					id: res.data.id,
					data_question_review: arrayParsed,
				});
			})
			.catch((err) => {
				throw err;
			});
	}, [params.id]);
	return (
		<div className="pt-8 min-h-[91vh] sm:min-h-[90vh] flex flex-col">
			{data ? (
				<div className="flex flex-col items-center h-full">
					<h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-center">
						Review Page
					</h2>

					<div className="max-h-[70vh] mt-5 flex flex-col gap-y-2 px-2 overflow-y-auto">
						{data.data_question_review.map((el, index) => {
							return (
								<Card
									key={index}
									className="max-w-xl w-full px-6 py-9 rounded-lg"
								>
									<List>
										<ListItem className="cursor-default">
											<ReviewCard
												answered={el.answered}
												correctAnswer={el.correct}
												question={el.question}
											/>
										</ListItem>
									</List>
								</Card>
							);
						})}
					</div>
				</div>
			) : (
				<p className="text-center text-xl md:text-xl lg:text-2xl font-semibold m-auto">Loading review page ...</p>
			)}
		</div>
	);
};

export default ReviewPage;
