import { FC } from "react";
import {
	CleanedQuestionType,
	AnsweredDataType,
} from "../../app/quiz/quiz.type";
import sanitizeHtml from "sanitize-html";
export interface QuestionProps {
	question_part: CleanedQuestionType;
	number_questions: number;
	stateFunc: {
		isQuizDone: boolean;
		setAnswerdata: React.Dispatch<
			React.SetStateAction<AnsweredDataType[] | null>
		>;
		setIndexQuestions: React.Dispatch<React.SetStateAction<number>>;
		indexQuestions: number;
		answerData: AnsweredDataType[] | null;
	};
	digitalTime: string;
}
export type ResultSetType = {
	correctAnswer: number;
	wrongAnswer: number;
	emptyAnswer: number;
};
const Question: FC<QuestionProps> = (props: QuestionProps): JSX.Element => {
	const {
		answerData,
		indexQuestions,
		setAnswerdata,
		setIndexQuestions,
		isQuizDone,
	} = props.stateFunc;

	function handleButtonAnswer(el: string) {
		answerData
			? setAnswerdata([
					...answerData,
					{
						index: indexQuestions,
						answered: el,
						correct: props.question_part.correct_answer,
						question: props.question_part.question,
					},
			  ])
			: setAnswerdata([
					{
						index: indexQuestions,
						answered: el,
						correct: props.question_part.correct_answer,
						question: props.question_part.question,
					},
			  ]);
		if (indexQuestions < props.number_questions - 1) {
			setIndexQuestions((indexQuestions) => indexQuestions + 1);
		}
	}
	return (
		<>
			{isQuizDone || indexQuestions === null ? null : (
				<div className="max-w-lg m-auto bg-white py-8 px-4 rounded-lg shadow-md w-full">
					<div className="flex justify-between items-center">
						<p className="font-semibold">
							{indexQuestions + 1} / {props.number_questions}
						</p>
						<p className="font-semibold text-xl bg-slate-400 w-16 rounded-md py-1 text-center text-slate-100">
							{props.digitalTime}
						</p>
					</div>
					<p className="max-w-full">
						{sanitizeHtml(props.question_part.question)}
					</p>
					<div className="flex flex-col mt-3 gap-y-2">
						{props.question_part.shuffledAnswer.map(
							(el: string, index: number) => {
								return (
									<button
										onClick={() => {
											handleButtonAnswer(el);
										}}
										key={index}
										className="py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 hover:shadow-lg transition-all  duration-200"
									>
										{sanitizeHtml(el)}
									</button>
								);
							}
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Question;
