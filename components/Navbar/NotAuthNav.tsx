import React from "react";
import Link from "next/link";
import { NavStateProps } from "./Navbar.types";
const NotAuthNav: React.FC<NavStateProps> = ({ setIsNavbarOpen }) => {
	return (
		<ul className="flex sm:items-center sm:gap-x-4 flex-col sm:gap-y-0 sm:flex-row gap-y-4">
			<li>
				<Link
					className="text-center block sm:text-start"
					onClick={() => {
						setIsNavbarOpen(false);
					}}
					href={"/auth/login"}
				>
					Login
				</Link>
			</li>
			<li>
				<Link
					className="text-center block sm:text-start"
					onClick={() => {
						setIsNavbarOpen(false);
					}}
					href={"/auth/signup"}
				>
					Signup
				</Link>
			</li>
		</ul>
	);
};

export default NotAuthNav;
