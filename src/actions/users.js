export const ADD_QUESTION_FOR_USER = 'ADD_QUESTION_FOR_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export function receiveUsers (users) {
    return {
       type: RECEIVE_USERS,
       users,
    }
}

export function addQuestionForUser(userId, questionId){
    return {
        type: ADD_QUESTION_FOR_USER,
        userId,
        questionId,
    }
}

export function submitAnswerForUser(answer, userId) {
    return {
        type: SUBMIT_ANSWER,
        answer,
        userId
    }
}