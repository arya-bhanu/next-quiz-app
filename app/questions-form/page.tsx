"use client";
import "./form-questions.css";
import { useRouter } from "next/navigation";
import { SubmitedStateType } from "./form-questions.type";
import useFetch from "@/hooks/useFetch";
import { ResponseDatatype } from "../app.type";
import { useEffect } from "react";
import { axiosServerAuthConfig } from "../../config/axios.config";
function FormQuestions() {
	const router = useRouter();
	// must authorized
	useEffect(() => {
		axiosServerAuthConfig.get("/user/auth").catch((err) => {
			console.error(err);
			router.push("/auth/login");
		});
	}, [router]);
	const { resData, isLoading } = useFetch("/api_category.php");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const time = formData.get("time") as unknown;
		const number_questions = formData.get("number_questions") as unknown;
		const category = formData.get("category") as unknown;
		const difficulty = formData.get("difficulty") as unknown;
		const type = formData.get("type") as unknown;
		window.localStorage.clear();
		window.sessionStorage.clear();

		setTimeout(() => {
			router.push("/quiz");
		}, 100);

		window.localStorage.setItem(
			"STATE",
			JSON.stringify({
				category,
				difficulty,
				number_questions,
				time,
				type,
			} as SubmitedStateType)
		);
		window.localStorage.setItem("TIME", JSON.stringify(Number(time) * 60));
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white  m-auto rounded-lg px-5 py-7 max-w-lg w-full flex flex-col gap-y-2"
		>
			<div className="form-input-wrapper">
				<label htmlFor="time">Quiz Time (Minute)</label>
				<input
					type="number"
					name="time"
					id="time"
					defaultValue={10}
					min={1}
					max={20}
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="number_questions">Number of Questions</label>
				<input
					type="number"
					name="number_questions"
					id="number_questions"
					defaultValue={10}
					min={5}
					max={20}
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="category">Select Category :</label>
				{isLoading ? (
					<div className="pulse bg-slate-300 w-full h-9 rounded-md"></div>
				) : (
					<select
						name="category"
						id="category"
						required
					>
						<option
							value=""
							disabled
						>
							Any Category
						</option>
						{(resData as ResponseDatatype).trivia_categories.map((el) => {
							return (
								<option
									key={el.id}
									value={el.id}
								>
									{el.name}
								</option>
							);
						})}
					</select>
				)}
			</div>

			<div className="form-input-wrapper">
				<label htmlFor="difficulty">Select Difficulty :</label>
				<select
					name="difficulty"
					id="difficulty"
					required
				>
					<option
						value=""
						disabled
					>
						Any Difficulty
					</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="type">Select Type :</label>
				<select
					name="type"
					id="type"
					required
				>
					<option
						value=""
						disabled
					>
						Any Type
					</option>
					<option value="multiple">Multiple</option>
					<option value="boolean">True / False</option>
				</select>
			</div>
			<button
				type="submit"
				className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
				disabled={isLoading}
			>
				Start Quiz
			</button>
		</form>
	);
}

export default FormQuestions;
