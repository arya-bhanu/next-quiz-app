"use client";
import React from "react";
import ResumeQuizProvider from "./ResumeQuizProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
	return <ResumeQuizProvider>{children}</ResumeQuizProvider>;
};

export default Provider;
