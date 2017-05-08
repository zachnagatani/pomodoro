import {
    INCREMENT_WORK_TIME, incrementWorkTime,
    DECREMENT_WORK_TIME, decrementWorkTime,
    INCREMENT_REST_TIME, incrementRestTime,
    DECREMENT_REST_TIME, decrementRestTime,
    TOGGLE_STATUS, toggleStatus
} from '../actions/actions';

// Set the initial state of the app
const initialState = {
    status: 'Work',
    times: {
        workTime: 1,
        restTime: 1
    }
};

// Reducer to handle the actions and produce the new state that we need
function pomodoroApp(state = initialState, action) {
    // Increment or decrement the work/rest time depending on the type
    // of action received
    switch (action.type) {
        case INCREMENT_WORK_TIME:
            return Object.assign({}, state, {
                workTime: state.workTime + 1
            });
            break;
        case DECREMENT_WORK_TIME:
            return Object.assign({}, state, {
                workTime: state.workTime - 1
            });
            break;
        case INCREMENT_REST_TIME:
            return Object.assign({}, state, {
                restTime: state.restTime + 1
            });
            break;
        case DECREMENT_REST_TIME:
            return Object.assign({}, state, {
                restTime: state.restTime - 1
            });
            break;
        case TOGGLE_STATUS:
            return Object.assign({}, state, {
                status: state.status === 'Work' ? 'Rest' : 'Work'
            });
            break;
        default:
            return state;
    }
}

export default pomodoroApp;