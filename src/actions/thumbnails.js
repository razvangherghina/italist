import store from '../store';

import convert from 'xml-to-json-promise';
import factory from 'aws-api-gateway-client';


const apiGatewayAddress = 'https://s5ntd5ns21.execute-api.eu-west-1.amazonaws.com/test';
const s3Address = 'https://s3-eu-west-1.amazonaws.com/italist/';
const api = factory.newClient({invokeUrl: apiGatewayAddress});
const maxSize = 5 * 1024 * 1024;

const readAsDataURL = (file) => {
    if (!(file instanceof Blob)) {
        throw new TypeError('Must be a File or Blob');
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = e => reject(`Error reading ${file.name}: ${e.target.result}`);
        reader.readAsDataURL(file);
    });
};

export const START_FETCH = 'START_FETCH';
export const FETCH_ERROR = 'FETCH_ERROR';
export const INSERT_LIST = 'INSERT_LIST';

export const START_UPLOAD = 'START_UPLOAD';
export const OK_UPLOAD = 'OK_UPLOAD';
export const ERROR_UPLOAD = 'ERROR_UPLOAD';

export const fetchThumbnails = () => dispatch => {
    dispatch({type: START_FETCH});

    api.invokeApi({}, '/italist', 'GET')
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

const getThType = () => {
    const state = store.getState();
    return state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname === '/big'
        ? 't360'
        : 't120';
};


export const upload = (files) => dispatch => {

    if (!files || !files.length) 
        return;
    const file = files[0];
    dispatch({type: START_UPLOAD});
    if (file.size > maxSize) 
        return dispatch({type: ERROR_UPLOAD, payload: 'File too big (5Mb limit)!'});
  
    const thType = getThType(); 

    readAsDataURL(file).then(f => api.invokeApi({}, '/italist', 'POST', {}, {
        thumbnailType: thType,       
        file: f
    })).then(res => {           
        if (res && res.data && res.data.errorMessage) 
            throw new Error(res.data.errorMessage);
        const receivedKey = res && res.data;
        if (!receivedKey) 
            throw new Error('Upload error!');
        dispatch({
            type: OK_UPLOAD,
            payload: {
                t120: thType === 't120'
                    ? s3Address + receivedKey
                    : null,
                t360: thType === 't360'
                    ? s3Address + receivedKey
                    : null
            }
        });
    }).catch(err => {      
        dispatch({type: ERROR_UPLOAD, payload: err});
    });

};