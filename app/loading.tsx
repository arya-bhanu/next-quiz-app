import React from "react";
import "./globals.css";
const Loading = () => {
	return (
		<div className="flex items-center justify-center m-auto">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loading;
