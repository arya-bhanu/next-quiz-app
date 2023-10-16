"use client";
import React, { useEffect, useState } from "react";
import { axiosServerAuthConfig } from "@/config/axios.config";
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
				<div className="flex flex-col items-center h-full max-w-2xl mx-auto">
					<h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-center">
						Review Page
					</h2>
					<div className="max-h-[70vh] flex flex-col gap-y-5 overflow-auto mt-4 px-2">
						{data.data_question_review.map((el, index) => {
							return (
								<ReviewCard
									key={index}
									answered={el.answered}
									correctAnswer={el.correct}
									question={el.question}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<p className="text-center text-xl md:text-xl lg:text-2xl font-semibold m-auto">
					Loading review page ...
				</p>
			)}
		</div>
	);
};

export default ReviewPage;
