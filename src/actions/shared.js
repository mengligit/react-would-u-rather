import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import {receiveUsers, addQuestionForUser, submitAnswerForUser} from '../actions/users';
import {receiveQuestions, addQuestion, submitAnswer} from '../actions/questions';
import { setAuthedUser } from "../actions/authedUser";
import {showLoading, hideLoading} from 'react-redux-loading';

//todo: set this ID later using the login component
const AUTHED_ID = '';

export function handleGetInitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData().then(({users, questions}) => {
            console.log("users in shared: ", users);
            console.log("questions in shared: ", questions);
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));

            //todo: set this ID later using the login component
            dispatch(setAuthedUser(AUTHED_ID))

            //set loading status to true means finish loading
            dispatch(hideLoading());
        })
    }
}

export function handleAddQuestion (question, userId) {
    return (dispatch) => {
        return saveQuestion(question).then((question) => {
            console.log("handleAddQuestion question: ", question);
            dispatch(addQuestion(question));
            dispatch(addQuestionForUser(userId, question.id))
           
        })
    }
}

export function handleSubmitAnswer (answerObj, userId) {
    return (dispatch) => {
        return saveQuestionAnswer(answerObj).then(() => {
            console.log("saveQuestionAnswer answer: ", answerObj);

            dispatch(submitAnswerForUser(answerObj, userId));
            dispatch(submitAnswer(answerObj))
           
        })
    }
}