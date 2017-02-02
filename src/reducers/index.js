import {combineReducers} from 'redux';

import ThumbnailsReducer from './thumbnails';
import {routerReducer as RouterReducer} from 'react-router-redux';

// TODO: remove gifs and modal from here
const rootReducer = combineReducers({
  thumbnails: ThumbnailsReducer,
  routing: RouterReducer
});

export default rootReducer;
