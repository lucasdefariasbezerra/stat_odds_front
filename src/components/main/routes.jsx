import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../app';
import About from '../about';
import Pictures from '../shared/pictures';
import TeamPage from '../teams/teamPage';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TeamPage} />
            <Route path="/about" component={About} />
            <Pictures path="/pictures" component={Pictures} />
            <Route path="*" component={TeamPage} />
        </Switch>
    </Router>
);

export default Routes;

