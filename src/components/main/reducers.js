import { combineReducers } from 'redux';
import teamReducer from '../teams/teamReducer';
import seasonReducer from '../seasons/seasonReducer';
import appStateReducer from '../shared/appStateReducer';


const rootReducer = combineReducers({
    team: teamReducer,
    season: seasonReducer,
    appState: appStateReducer
});

export default rootReducer;