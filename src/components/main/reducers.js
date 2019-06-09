import { combineReducers } from 'redux';
import teamReducer from '../teams/teamReducer';

const rootReducer = combineReducers({
    team: teamReducer
});

export default rootReducer;