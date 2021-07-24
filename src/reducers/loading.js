import {SET_LOADING} from '../actions/loading';

export default function loading(state=false, action) {
    switch (action.type) {
        case SET_LOADING:
            return action.status
        default:
            return state;
            
    }
}