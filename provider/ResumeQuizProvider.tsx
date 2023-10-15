import React, { useState } from "react";
import { createContext } from "react";

type ResumeQuizContextType = {
	isResumable: boolean;
	saveIsResumable: (bol: boolean) => void;
};
export const ResumeQuizContext = createContext<ResumeQuizContextType>({
	isResumable: false,
	saveIsResumable: () => {},
});
const ResumeQuizProvider = ({ children }: { children: React.ReactNode }) => {
	const [isResumable, setIsResumable] = useState(false);
	const saveIsResumable = (bol: boolean) => {
		setIsResumable(bol);
	};
	return (
		<ResumeQuizContext.Provider value={{ isResumable, saveIsResumable }}>
			{children}
		</ResumeQuizContext.Provider>
	);
};

export default ResumeQuizProvider;
