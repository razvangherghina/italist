import store from '../store';

import convert from 'xml-to-json-promise';
import factory from 'aws-api-gateway-client';
const apiGatewayAddress = 'https://s5ntd5ns21.execute-api.eu-west-1.amazonaws.com/test';
const s3Address = 'https://s3-eu-west-1.amazonaws.com/italist/';
const api = factory.newClient({invokeUrl: apiGatewayAddress});

export const START_FETCH = 'START_FETCH';
export const FETCH_ERROR = 'FETCH_ERROR';
export const INSERT_LIST = 'INSERT_LIST';

export const START_UPLOAD = 'START_UPLOAD';
export const OK_UPLOAD = 'OK_UPLOAD';
export const ERROR_UPLOAD = 'ERROR_UPLOAD';

export const fetchThumbnails = () => dispatch => {
    dispatch({type: START_FETCH});

    api.invokeApi({}, '/', 'GET')
        .then(res => convert.xmlDataToJSON(res && res.data))
        .then(json => {

            // result has all files in the bucket
            let result = (json && json.ListBucketResult && json.ListBucketResult.Contents) || [];

            // result has all file names within the two folders
            result = result
                .map(r => r && r.Key && r.Key[0])
                .filter(k => k && (k.length > 5));

            // 120x120 thumbnails
            const t120 = result.filter(key => key.substring(0, 5) === 't120/').map(key => s3Address + key);
            const t360 = result.filter(key => key.substring(0, 5) === 't360/').map(key => s3Address + key);
            dispatch({
                type: INSERT_LIST,
                payload: {
                    t120,
                    t360
                }
            });
        })
        .catch(err => dispatch({type: FETCH_ERROR, payload: err}));
};

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
    console.log('Uploading', file, getThType());
    dispatch({type: START_UPLOAD});
    setTimeout(() => {
        dispatch({type: ERROR_UPLOAD, payload: 'Generic error'});
    }, 1000);
    setTimeout(() => {
        dispatch({
            type: OK_UPLOAD,
            payload: {
                t120: thType === '120'
                    ? file.name
                    : null,
                t360: thType === '360'
                    ? file.name
                    : null
            }
        });
    }, 3000);
};