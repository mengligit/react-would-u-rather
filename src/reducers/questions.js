import {RECEIVE_QUESTIONS, ADD_QUESTION, SUBMIT_ANSWER} from '../actions/questions';

export default function questions (state={}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case SUBMIT_ANSWER:
            return {
                ...state,
                [action.answer.qid]: {
                    ...state[action.answer.qid],
                    optionOne: action.answer.answer === 'optionOne'?  {
                        ...state[action.answer.qid].optionOne,
                        votes: state[action.answer.qid].optionOne.votes.concat([action.answer.authedUser])
                    }: (state[action.answer.qid].optionOne),

                    optionTwo: action.answer.answer === 'optionTwo'?  {
                        ...state[action.answer.qid].optionTwo,
                        votes: state[action.answer.qid].optionTwo.votes.concat([action.answer.authedUser])
                    }: (state[action.answer.qid].optionTwo),
                }
            }

        default:
            return state;
    }
}