import {START_FETCH} from '../actions';

const initialState = {
    fetching: false
};

const thumbnails = (state = initialState, action) => {
    switch (action.type) {
        case START_FETCH:
            return {
                ...state,
                fetching: true
            };
        default:
            return state;
    }
};

export default thumbnails;
