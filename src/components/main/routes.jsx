import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../app';
import About from '../about';
import Pictures from '../shared/pictures';
import TeamPage from '../teams/teamPage';
import SeasonPage from '../seasons/seasonPage';
import FileUploadPage from '../teams/fileUploadPage';
import seasonPage from '../seasons/seasonPage';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TeamPage} />
            <Route path="/about" component={About} />
            <Route path="/team_upload" component={FileUploadPage} />
            <Route path="/seasons" component={seasonPage} />
            <Pictures path="/pictures" component={Pictures} />
            <Route path="*" component={TeamPage} />
        </Switch>
    </Router>
);

export default Routes;

