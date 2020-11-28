import { combineReducers } from 'redux';
import teamReducer from '../teams/teamReducer';
import appStateReducer from '../shared/appStateReducer';

const rootReducer = combineReducers({
    team: teamReducer,
    appState: appStateReducer
});

export default rootReducer;