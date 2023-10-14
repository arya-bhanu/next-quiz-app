"use client";
import { useState } from "react";
import { axiosServerConfig } from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
function Signup() {
	const router = useRouter();
	const [isPassValid, setIsPassValid] = useState<boolean>(true);
	const [isPassEqual, setIsPassEqual] = useState<boolean>(true);
	function handleSubmit(event: any) {
		event.preventDefault();
		const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])[a-zA-Z\d\W_]{4,12}$/;
		const username = event.target.elements.username.value;
		const email = event.target.elements.email.value;
		const password = event.target.elements.password.value;
		const password_retype = event.target.elements.password_retype.value;
		if (regex.test(password)) {
			setIsPassValid(true);
			axiosServerConfig
				.post(
					"/user/auth/register",
					{ email, password, confirm_password: password_retype, username },
					{ headers: { "Content-Type": "application/json" } }
				)
				.then((res: any) => {
					toast(res.data.message, { type: "success" });
					router.push("/auth/login");
				})
				.catch((err) => {
					console.log(err?.message);
					if (err.response.status == 400) {
						setIsPassEqual(false);
					}
				});
		} else {
			setIsPassValid(false);
		}
	}
	return (
		<motion.form
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
			onSubmit={handleSubmit}
			className="bg-white shadow-lg rounded-lg mx-auto px-5 py-7 max-w-lg w-full flex flex-col gap-y-2"
		>
			<h4 className="font-semibold text-2xl text-center">SIGNUP</h4>
			<div className="form-input-wrapper">
				<label htmlFor="time">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					required
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="time">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required
				/>
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="number_questions">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
				/>
				{!isPassValid && (
					<p className="text-red-600">
						password harus memiliki 4 - 12 karakter, mengandung simbol, huruf,
						angka, tanpa space
					</p>
				)}
				{!isPassEqual && <p className="text-red-600">password tidak cocok</p>}
			</div>
			<div className="form-input-wrapper">
				<label htmlFor="number_questions">Confirm Password</label>
				<input
					type="password"
					name="password_retype"
					id="password_retype"
					required
				/>
				{!isPassValid && (
					<p className="text-red-600">
						password harus memiliki 4 - 12 karakter, mengandung simbol, huruf,
						angka, tanpa space
					</p>
				)}
				{!isPassEqual && <p className="text-red-600">password tidak cocok</p>}
			</div>
			<button
				type="submit"
				className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
			>
				SIGN UP
			</button>
		</motion.form>
	);
}

export default Signup;
