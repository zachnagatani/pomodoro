const INCREMENT_WORK_TIME = 'INCREMENT_WORK_TIME',
      DECREMENT_WORK_TIME = 'DECREMENT_WORK_TIME',
      INCREMENT_REST_TIME = 'INCREMENT_REST_TIME',
      DECREMENT_REST_TIME = 'DECREMENT_REST_TIME';

export function incrementWorkTime() {
    return {
        type: INCREMENT_WORK_TIME
    }
}

export function decrementWorkTime() {
    return {
        type: DECREMENT_WORK_TIME
    }
}

export function incrementRestTime() {
    return {
        type: INCREMENT_REST_TIME
    }
}

export function decrementRestTime() {
    return {
        type: DECREMENT_REST_TIME
    }
}