import {
    START_FETCH,
    INSERT_LIST,
    FETCH_ERROR,
    OK_UPLOAD,
    START_UPLOAD,
    ERROR_UPLOAD
} from '../actions';

const initialState = {
    uploading: false,
    fetching: false,
    error: null,
    errorUpload: null,
    t120: [],
    t360: []
};

const thumbnails = (state = initialState, action) => {
    switch (action.type) {
            // starting fetching thumbnails for server
        case START_FETCH:
            return {
                ...state,
                t120: [],
                t360: [],
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
        case START_UPLOAD:
            return {
                ...state,
                uploading: true
            };
        case OK_UPLOAD:
            return {
                ...state,
                t120: (action.payload.t120 ? [action.payload.t120] : []).concat(state.t120),
                t360: (action.payload.t360 ? [action.payload.t360] : []).concat(state.t360),
                errorUpload: null,
                uploading: false
            };
        case ERROR_UPLOAD:
            return {
                ...state,
                errorUpload: action.payload,
                uploading: false
            };
        default:
            return state;
    }
};

export default thumbnails;
