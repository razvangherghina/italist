import store from '../store';

export const START_FETCH = 'START_FETCH';
export const FETCH_ERROR = 'FETCH_ERROR';
export const INSERT_LIST = 'INSERT_LIST';

export const START_UPLOAD = 'START_UPLOAD';
export const OK_UPLOAD = 'OK_UPLOAD';
export const ERROR_UPLOAD = 'ERROR_UPLOAD';

export const mockFetch = () => dispatch => {
    dispatch({type: START_FETCH});
    setTimeout(() => {
        dispatch({
            type: INSERT_LIST,
            payload: {
                t360: [
                    'http://timelinethumbnailcreator.com/img/icon-brush-256.png', 'http://blog.room34.com/wp-content/uploads/underdog/logo.thumbnail.png'
                ],
                t120: [
                    'https://cdn01.boxcdn.net/cdn/farfuture/QHbxX4l5tB7lGqFOmr8mpfgCToQjdC3CgzylCT7br' +
                            'fQ/md5:307b50be8e0f182984d0c28bb81c20b8/sites/default/files/thumbnail-sample.png',
                    'https://static1.squarespace.com/static/5515b9dfe4b0570dfe189823/t/56461426e4b04b' +
                            '5d43f6c692/1447433254484/DTW-Website-Thumbnails-15.png'
                ]
            }
        });
    }, 1000);
};

const getThType = () => {
    const state = store.getState();
    return state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname === '/big'
        ? '360'
        : '120';
};

export const upload = (files) => dispatch => {

    if (!files || !files.length)
        return;
    const file = files[0];
    const thType = getThType();
    console.log('Uploading',file,getThType());     
    dispatch({type: START_UPLOAD});
    setTimeout(() => {
        dispatch({type: ERROR_UPLOAD, payload: 'Generic error'});
    }, 1000);
    setTimeout(() => {
        dispatch({
            type: OK_UPLOAD,
            payload: {
                t120: thType === '120' ? file.name : null,
                t360: thType === '360' ? file.name : null,
            }
        });
    }, 3000);
};