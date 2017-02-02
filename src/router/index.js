import React from 'react';

import App from '../components/App';
import Thumbnails120 from '../components/Thumbnails120';
import Thumbnails360 from '../components/Thumbnails360';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '../store';

const history = syncHistoryWithStore(browserHistory, store);

const router = (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Thumbnails120}/>
            <Route path="big" component={Thumbnails360}/>
        </Route>
    </Router>
);

export default router;
