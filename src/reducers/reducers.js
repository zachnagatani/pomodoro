import {
    INCREMENT_WORK_TIME, incrementWorkTime,
    DECREMENT_WORK_TIME, decrementWorkTime,
    INCREMENT_REST_TIME, incrementRestTime,
    DECREMENT_REST_TIME, decrementRestTime
} from '../actions/actions';

// Set the initial state of the app
const initialState = {
    workTime: 25,
    restTime: 5
};

// Reducer to handle the actions and produce the new state that we need
function pomodoroApp(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_WORK_TIME:
            return Object.assign({}, state, {
                workTime: state.workTime++
            });
            break;
        case DECREMENT_WORK_TIME:
            return Object.assign({}, state, {
                workTime: state.workTime--
            });
            break;
        case INCREMENT_REST_TIME:
            return Object.assign({}, state, {
                restTime: state.restTime++
            });
            break;
        case DECREMENT_REST_TIME:
            return Object.assign({}, state, {
                restTime: state.restTime--
            });
            break;
        default:
            return state;
    }
}

export default pomodoroApp;