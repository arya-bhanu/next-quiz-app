export interface AnsweredDataType {
    index: number;
    answered: string;
    correct: string;
}

export type ArrayRawDataResponseType = {
    response_code: number,
    results: {
        category: string,
        correct_answer: string,
        difficulty: string,
        incorrect_answers: string[],
        question: string,
        type: string
    }[]
}

export type CleanedQuestionType = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    shuffledAnswer: string[]
    type: string
}