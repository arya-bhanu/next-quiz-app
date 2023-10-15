"use client";
import "./result.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ResultSetType } from "@/components/Question/Question";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function Result() {
	const router = useRouter();
	const [stateDone, setStateDone] = useState<ResultSetType | null>(null);
	useEffect(() => {
		const stateDoneLocal = window.sessionStorage.getItem("STATE_DONE");
		if (!stateDoneLocal) {
			toast("Error! Data state not available", { type: "error" });
			return router.push("/questions-form");
		}
		const stateDone = JSON.parse(stateDoneLocal);
		setStateDone(stateDone.state as ResultSetType);
		window.localStorage.clear();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return stateDone ? (
		<div
			id="result-card"
			className="max-w-lg m-auto w-full bg-white rounded-md shadow-md py-7 px-5"
		>
			<h4 className="text-center font-semibold text-2xl">Your Result Score</h4>
			<div className="mt-4 flex flex-col gap-y-2 ">
				<p>
					Correct Answer : <span>{stateDone.correctAnswer}</span>
				</p>
				<p>
					Wrong Answer : <span>{stateDone.wrongAnswer}</span>
				</p>
				<p>
					Not Answered : <span>{stateDone.emptyAnswer}</span>
				</p>
			</div>
			<Link
				href={"/scoreboard"}
				className="mx-auto block w-fit bg-blue-900 text-white py-1.5 px-2 rounded-md mt-3 hover:bg-blue-950"
			>
				Your Scoreboard
			</Link>
		</div>
	) : (
		<p className="text-center text-lg md:text-xl lg:text-2xl m-auto font-semibold">
			Checking result data ...
		</p>
	);
}

export default Result;
