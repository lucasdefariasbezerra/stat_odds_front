import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import About from '../about';
import TeamPage from '../teams/teamPage';
import SeasonPage from '../seasons/seasonPage';
import FileUploadPage from '../teams/fileUploadPage';
import StandingsPage from '../standings/standingsPage';
import 'antd/dist/antd.css';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TeamPage} />
            <Route path="/about" component={About} />
            <Route path="/file_upload/:target" component={FileUploadPage} />
            <Route path="/seasons" component={SeasonPage} />
            <Route path="/standings/:seasonId" component={StandingsPage}/>
            <Route path="*" component={TeamPage} />
        </Switch>
    </Router>
);

export default Routes;

