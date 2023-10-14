import { axiosConfig } from "@/config/axios.config";
import { useEffect, useState } from "react";
export type ReturnError = {
	isError?: boolean;
	message?: string;
};
function useFetch(url: string) {
	const [resData, setResdata] = useState<any>(null || []);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState<ReturnError>({});
	useEffect(() => {
		axiosConfig
			.get(url)
			.then((response) => {
				setResdata(response.data);
			})
			.catch((err) => {
				setIsError({ isError: true, message: err.toString() });
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [url]);
	return { resData, isLoading, isError };
}
export default useFetch;
