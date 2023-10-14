import { ReturnError } from "@/hooks/useFetch";
import { CleanedQuestionType } from "./quiz/quiz.type";
export type ResponseQuestionsType = {
    results: CleanedQuestionType[];
    response_code: number
}
export type FetchReponseType = {
    resData: ResponseDatatype | ResponseQuestionsType
    isLoading: boolean;
    isError: ReturnError;
};
export type ResponseDatatype = {
    trivia_categories: {
        id: number;
        name: string;
    }[];
};