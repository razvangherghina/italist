import {START_FETCH, INSERT_LIST, FETCH_ERROR} from '../actions';

const initialState = {
    fetching: false,
    error: null,
    t120: [],
    t360: []
};

const thumbnails = (state = initialState, action) => {
    switch (action.type) {
            // starting fetching thumbnails for server
        case START_FETCH:
            return {
                ...state,
                fetching: true
            };
            // thumbnails list arrived from server
        case INSERT_LIST:
            return {
                ...state,
                fetching: false,
                error: null,
                t120: (action.payload && action.payload.t120) || [],
                t360: (action.payload && action.payload.t360) || []
            };
            // fetching error
        case FETCH_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default thumbnails;
