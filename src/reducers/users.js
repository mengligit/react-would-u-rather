import {RECEIVE_USERS, ADD_QUESTION_FOR_USER, SUBMIT_ANSWER} from '../actions/users';

export default function users (state={}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION_FOR_USER:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    questions: state[action.userId].questions.concat([action.questionId])
                }
            }
        case SUBMIT_ANSWER:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    answers: Object.assign(state[action.userId].answers, {[action.answer.qid]: action.answer.answer}),
                }
            }
        default:
            return state;
    }
}