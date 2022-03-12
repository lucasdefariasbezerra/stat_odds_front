import { combineReducers } from 'redux';
import teamReducer from '../teams/teamReducer';
import seasonReducer from '../seasons/seasonReducer';
import matchReducer from '../standings/matchReducer';
import appStateReducer from '../shared/appStateReducer';


const rootReducer = combineReducers({
    team: teamReducer,
    season: seasonReducer,
    match: matchReducer,
    appState: appStateReducer
});

export default rootReducer;