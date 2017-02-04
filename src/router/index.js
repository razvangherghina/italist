import React from 'react';

import App from '../components/App';
import Thumbnails from '../components/Thumbnails';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '../store';

const history = syncHistoryWithStore(browserHistory, store);

const router = (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Thumbnails}/>
            <Route path="big" component={Thumbnails}/>
        </Route>
    </Router>
);

export default router;
