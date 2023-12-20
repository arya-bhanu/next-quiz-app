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
		<div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
			{correctAnswer !== answered && (
				<p className="mb-2 text-lg md:text-xl text-center w-full px-3 py-1.5 rounded-md font-semibold leading-tight text-neutral-50 bg-red-600">
					Wrong Answer
				</p>
			)}
			<p className="mb-2 text-lg md:text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
				Question
			</p>
			<p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
				{sanitizeHtml(question)}
			</p>
			<div className="flex justify-between flex-wrap">
				<div>
					<p className="bg-green-700 px-2 py-1 rounded-md text-white">
						Correct Answer
					</p>
					<p>{sanitizeHtml(correctAnswer)}</p>
				</div>
				<div>
					<p className="bg-blue-700 px-2 py-1 rounded-md text-white">
						Your Answer
					</p>
					<p>{sanitizeHtml(answered)}</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
