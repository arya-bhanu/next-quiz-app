import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Provider from "@/provider/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DOT Quiz",
	description: "Quiz Application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Provider>
				<body className={`bg-slate-100 ${inter.className}`}>
					<ToastContainer
						autoClose={3000}
						bodyClassName={""}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						position="top-center"
						pauseOnHover
						theme="colored"
					/>

					<div className="flex flex-col items-center min-h-screen">
						<Navbar />
						<div className="container flex flex-col mx-auto pt-[9vh] sm:pt-[10vh] min-h-screen">
							{children}
						</div>
					</div>
				</body>
			</Provider>
		</html>
	);
}
