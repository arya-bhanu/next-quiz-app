import React from "react";
import Link from "next/link";
import { axiosServerAuthConfig } from "@/config/axios.config";
import { NavStateProps } from "./Navbar.types";
const AuthenticatedNav: React.FC<NavStateProps> = ({
	setIsNavbarOpen,
}) => {
	function handleLogout(e: React.MouseEvent<Element>) {
		e.preventDefault();
		axiosServerAuthConfig
			.delete("/user/auth/logout")
			.then(() => {
				window.location.href = "/";
			})
			.catch((err: unknown) => {
				console.log(err);
			});
	}
	return (
		<ul className="flex sm:items-center sm:gap-x-4 flex-col sm:gap-y-0 sm:flex-row gap-y-4">
			<li>
				<Link
					onClick={() => {
						setIsNavbarOpen(false);
					}}
					href={"/scoreboard"}
					className="text-center block sm:text-start"
				>
					My Scoreboard
				</Link>
			</li>
			<li>
				<Link
					onClick={() => {
						setIsNavbarOpen(false);
					}}
				    href={"/questions-form"}
					className="text-center block sm:text-start"
				>
					Start Quiz
				</Link>
			</li>
			<li>
				<button
					onClick={handleLogout}
					className="text-center block w-full sm:text-start"
				>
					Logout
				</button>
			</li>
		</ul>
	);
};

export default AuthenticatedNav;
