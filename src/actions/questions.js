export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER_FOR_QUESTION';

export function receiveQuestions (questions) {
    return {
       type: RECEIVE_QUESTIONS,
       questions,
    }
}

export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function submitAnswer (answer) {
    return {
        type: SUBMIT_ANSWER,
        answer
    }
}
