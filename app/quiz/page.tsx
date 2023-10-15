"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Question from "@/components/Question/Question";
import {
	AnsweredDataType,
	ArrayRawDataResponseType,
	CleanedQuestionType,
} from "./quiz.type";
import { axiosConfig } from "../../config/axios.config";
import { SubmitedStateType } from "../questions-form/form-questions.type";
import { ResultSetType } from "@/components/Question/Question";
import { axiosServerAuthConfig } from "../../config/axios.config";
import { ResumeQuizContext } from "@/provider/ResumeQuizProvider";
function Quiz() {
	// prepare data from localStorage API
	const router = useRouter();

	// react hooks
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [time, setTime] = useState<number | null>(null);
	const [dataState, setDataState] = useState<SubmitedStateType | null>(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isQuizDone, setIsQuizDone] = useState(false);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [resData, setResdata] = useState<CleanedQuestionType[] | null>(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [answerData, setAnswerdata] = useState<null | AnsweredDataType[]>(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [indexQuestions, setIndexQuestions] = useState<number>(0);
	const { saveIsResumable } = useContext(ResumeQuizContext);

	// prepare data question into application state
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const data = window.localStorage.getItem("ARRAY_QUESTIONS");
		const state = window.localStorage.getItem("STATE");
		const answered = window.localStorage.getItem("ANSWERED_QUESTIONS");
		const timeLocal = window.localStorage.getItem("TIME");
		if (!state) return router.push("/questions-form");
		const stateParsed = JSON.parse(state) as SubmitedStateType;
		if (answered) {
			setAnswerdata(JSON.parse(answered) as AnsweredDataType[]);
			setIndexQuestions(setIndexQuestionPosition(answered));
		}
		if (timeLocal) setTime(Number(JSON.parse(timeLocal)));
		if (data) setResdata(JSON.parse(data) as CleanedQuestionType[]);

		setDataState(stateParsed);

		if (!data) {
			axiosConfig
				.get(
					`/api.php?amount=${stateParsed.number_questions}&&category=${stateParsed.category}&&difficulty=${stateParsed.difficulty}&&type=${stateParsed.type}`
				)
				.then((res) => {
					const cleanedData = mapShuffleQuestions(
						res.data as ArrayRawDataResponseType
					);
					setResdata(cleanedData);
					window.localStorage.setItem(
						"ARRAY_QUESTIONS",
						JSON.stringify(cleanedData)
					);
				})
				.catch((err: unknown) => {
					console.error(err);
					router.push("/questions-form");
				});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// watch quiz and insert answered questions into localStorage API
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (dataState?.number_questions == answerData?.length) {
			insertScoreIntoDB();
		}
		if (answerData) {
			window.localStorage.setItem(
				"ANSWERED_QUESTIONS",
				JSON.stringify(answerData)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answerData, indexQuestions]);

	// countdown timing function
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		let stiId: NodeJS.Timeout;
		if (resData && dataState && time) {
			if (time > 0) {
				stiId = setInterval(() => {
					const timeString = window.localStorage.getItem("TIME");
					if (timeString) {
						let seconds = Number(JSON.parse(timeString));
						--seconds;
						window.localStorage.setItem("TIME", JSON.stringify(seconds));
						if (seconds === 0) {
							if (!answerData) {
								PostAnswer(
									0,
									dataState.number_questions,
									0,
									undefined,
									JSON.stringify(answerData)
								);
							} else {
								const { correctAnswer, emptyAnswer, wrongAnswer } = countResult(
									answerData,
									dataState.number_questions
								);
								PostAnswer(
									correctAnswer,
									emptyAnswer,
									wrongAnswer,
									undefined,
									JSON.stringify(answerData)
								);
							}
						}
						setTime(seconds);
					}
				}, 1000);
			}
			return () => {
				clearInterval(stiId);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time, resData]);
	useEffect(() => {
		if (!isQuizDone) {
			saveIsResumable(true);
		} else {
			saveIsResumable(false);
		}
	}, [isQuizDone, saveIsResumable]);
	// shuffle raw questions choice from API
	function mapShuffleQuestions(
		arrayRes: ArrayRawDataResponseType
	): CleanedQuestionType[] {
		function shuffleArray(array: any): [] {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		}
		const data = arrayRes.results.map((el) => {
			return {
				...el,
				shuffledAnswer: shuffleArray([
					...el.incorrect_answers,
					el.correct_answer,
				]),
			};
		});
		return data;
	}

	// set current index question of array
	function setIndexQuestionPosition(answered: string): number {
		const parsedData = JSON.parse(answered) as AnsweredDataType[];
		return parsedData.length;
	}

	// post counted quiz question & answer into server API
	function PostAnswer(
		score: number,
		not_answered: number,
		wrong_answer: number,
		sto: number | undefined | NodeJS.Timeout,
		dataQuestionsReview: string
	) {
		axiosServerAuthConfig
			.post("/user/score", {
				score,
				not_answered,
				wrong_answer,
				data_question_review: dataQuestionsReview,
			})
			.then(() => {
				clearTimeout(sto);
				window.sessionStorage.setItem(
					"STATE_DONE",
					JSON.stringify({
						state: {
							correctAnswer: score,
							emptyAnswer: not_answered,
							wrongAnswer: wrong_answer,
						} as ResultSetType,
					})
				);
				router.replace("/result");
			})
			.catch((err) => {
				console.error(err);
				router.push("/questions-form");
			});
	}

	function insertScoreIntoDB() {
		if (answerData && dataState) {
			setIsQuizDone(true);
			const { correctAnswer, emptyAnswer, wrongAnswer } = countResult(
				answerData,
				dataState.number_questions
			) as ResultSetType;
			const sto = setTimeout(() => {
				router.push("/questions-form");
			}, 5000);
			PostAnswer(
				correctAnswer,
				emptyAnswer,
				wrongAnswer,
				sto,
				JSON.stringify(answerData)
			);
		}
	}

	// convert seconds into digital time format MM:ss
	function digitalTime(time: number): string {
		const second = time % 60;
		const minute = Math.floor(time / 60);
		return `${minute} : ${second}`;
	}

	// count result from answered questions array and count it
	function countResult(
		answerData: AnsweredDataType[],
		number_questions: number
	) {
		let correctAnswer = 0;
		for (let i = 0; i < answerData.length; i++) {
			if (answerData[i].answered === answerData[i].correct) {
				correctAnswer++;
			}
		}
		return {
			correctAnswer,
			wrongAnswer: answerData.length - correctAnswer,
			emptyAnswer: number_questions - answerData.length,
		} as ResultSetType;
	}
	return (
		<>
			{resData !== null &&
			dataState !== null &&
			indexQuestions !== null &&
			time !== null ? (
				<Question
					number_questions={dataState.number_questions}
					question_part={resData[indexQuestions]}
					digitalTime={digitalTime(time)}
					stateFunc={{
						isQuizDone,
						setAnswerdata,
						setIndexQuestions,
						indexQuestions,
						answerData,
					}}
				/>
			) : (
				<p className="text-xl md:text-xl lg:text-2xl font-semibold text-center  m-auto">
					Preparing your quiz ...
				</p>
			)}
		</>
	);
}

export default Quiz;
