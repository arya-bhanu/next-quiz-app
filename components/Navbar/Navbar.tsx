"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import AuthenticatedNav from "./AuthenticatedNav";
import { useEffect } from "react";
import { axiosServerAuthConfig } from "@/config/axios.config";
import { Squash } from "hamburger-react";
import NotAuthNav from "./NotAuthNav";
import { ResumeQuizContext } from "@/provider/ResumeQuizProvider";

const Navbar = () => {
	const [isAuth, setIsAuth] = useState(false);
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const { isResumable } = useContext(ResumeQuizContext);
	useEffect(() => {
		axiosServerAuthConfig
			.get("/user/auth")
			.then(() => {
				setIsAuth(true);
			})
			.catch((err) => {
				console.error(err);
				setIsAuth(false);
			});
	}, []);
	return (
		<nav className="bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-150 fixed z-50 top-0 left-0 right-0 h-[9vh] sm:h-[10vh]">
			<div className="mx-auto flex container  items-center justify-between h-full">
				<Link href={"/"}>
					<h1 className="text-xl font-semibold">DOT Quiz</h1>
				</Link>
				<div className="hidden sm:block">
					{isAuth ? (
						<AuthenticatedNav
							setIsNavbarOpen={setIsNavbarOpen}
							isQuizResumable={isResumable}
						/>
					) : (
						<NotAuthNav setIsNavbarOpen={setIsNavbarOpen} />
					)}
				</div>
				<i className="sm:hidden">
					<Squash
						onToggle={() => {
							setIsNavbarOpen(!isNavbarOpen);
						}}
						toggled={isNavbarOpen}
					/>
				</i>
			</div>
			<div
				className={`h-fit sm:hidden shadow-lg bg-inherit w-full overflow-hidden transition-all duration-500 flex justify-center  ${
					isNavbarOpen ? "max-h-56 py-2" : "max-h-0 py-0"
				}`}
			>
				{isAuth ? (
					<AuthenticatedNav
						setIsNavbarOpen={setIsNavbarOpen}
						isQuizResumable={isResumable}
					/>
				) : (
					<NotAuthNav setIsNavbarOpen={setIsNavbarOpen} />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
