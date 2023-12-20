"use client";
import styles from "./Welcome.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import studyImg from "../../public/img/study.png";
function Home() {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	console.log(serverUrl)
	return (
		<div className="flex min-h-[91vh] sm:min-h-[90vh] items-center justify-between relative overflow-y-clip gap-x-5">
			<motion.div
				initial={{ x: -70, opacity: 0, y: 90 }}
				animate={{ x: -10, opacity: 1, y: 30 }}
				transition={{ delay: 0.6, ease: "easeInOut", duration: 0.6 }}
				className={`${styles.radial_backdrop} hidden xl:block absolute -left-48 -bottom-14 w-80 h-80 rounded-full`}
			></motion.div>
			<div className="flex flex-col gap-y-2 mx-auto md:mx-0">
				<motion.h1
					initial={{ x: -70, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.1, ease: "easeInOut", duration: 0.4 }}
					className="font-semibold lg:text-5xl text-4xl text-center md:text-start"
				>
					Welcome to DOT Quizz App
				</motion.h1>
				<motion.h3
					initial={{ x: 70, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.1, ease: "easeInOut", duration: 0.4 }}
					className="lg:text-3xl text-2xl md:text-start text-center"
				>
					Make your dreams come true
				</motion.h3>
				<motion.span
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, ease: "easeInOut", duration: 0.4 }}
					className="bg-slate-400 w-fit mt-3 md:mx-0 mx-auto"
				>
					<Link
						className="px-5 bg-blue-900 hover:bg-blue-950 transition-all duration-150 text-white py-2 rounded-md"
						href={"questions-form"}
					>
						Start Quiz
					</Link>
				</motion.span>
			</div>
			<motion.div
				initial={{ x: 70, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.4, ease: "easeInOut", duration: 0.4 }}
				className="rounded-full overflow-clip hidden md:block"
			>
				<Image
					priority={true}
					src={studyImg}
					alt="study image"
				/>
			</motion.div>
		</div>
	);
}

export default Home;
