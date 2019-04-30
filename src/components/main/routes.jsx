import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../app';
import About from '../about';
import Pictures from '../shared/pictures';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/about" component={About} />
            <Pictures path="/pictures" component={Pictures} />
            <Route path="*" component={App} />
        </Switch>
    </Router>
);

export default Routes;

