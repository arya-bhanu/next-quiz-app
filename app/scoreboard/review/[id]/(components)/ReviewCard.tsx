import React from "react";
import sanitizeHtml from "sanitize-html";
export type ReviewCardType = {
	question: string;
	answered: string;
	correctAnswer: string;
};
const ReviewCard: React.FC<ReviewCardType> = ({
	correctAnswer,
	question,
	answered,
}) => {
	return (
		<div className="w-full">
			{correctAnswer === answered ? (
				<p className="bg-green-600 px-2 py-1 text-white text-center rounded-md">
					Correct
				</p>
			) : (
				<p className="bg-red-600 px-2 py-1 text-white text-center rounded-md">
					Wrong
				</p>
			)}

			<div className="my-3">
				<p className="font-semibold">Question : </p>
				<p>{sanitizeHtml(question)}</p>
			</div>
			<div className="mt-2 flex justify-between flex-wrap">
				<div>
					<p className="bg-blue-600 w-fit text-white px-2 py-1 rounded-md">
						Your answer :{" "}
					</p>
					<p className="font-semibold mt-1">{sanitizeHtml(answered)}</p>
				</div>
				<div>
					<p className="bg-green-600 w-fit text-white px-2 py-1 rounded-md">
						Correct Answer :{" "}
					</p>
					<p className="font-semibold mt-1">{sanitizeHtml(correctAnswer)}</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
