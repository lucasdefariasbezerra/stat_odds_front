import { queryTeams, queryTeamDetails, querySports, updateTeams } from './graphqlRequests';
import * as TeamActionType from '../shared/type';

const handleFetchList = (type, content) => {
    return { type, payload: content };
};

const handleTeamDetails = (data) => {
    return { type: TeamActionType.TEAM_DETAILS, payload: data.team };
};

export const handleUpdate = (currentObject, field, value) => {
   const newObject = { ...currentObject, [field]: value};
   return { type: TeamActionType.UPDATE_TEAM, payload: newObject };
};

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        return queryTeams(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(TeamActionType.LIST_TEAM, data.paginatedTeams));
        });
    };
};

export const executeUpdate = (team) => {
    return dispatch => {
        return updateTeams(team).then((data) => {
            dispatch(changeLoadingState(false));
        });
    };
};

export const changeLoadingState = (loading) => {
    return { type: TeamActionType.CHANGE_LOADING_STATE, payload: loading };
};

export const fetchTeamDetails = (id) => {
    return dispatch => {
        return queryTeamDetails(id).then((data) => {
            dispatch(handleTeamDetails(data));
        });
    };
};

export const fetchSports = () => {
    return dispatch => {
        return querySports().then(data => {
            dispatch(handleFetchList(TeamActionType.SPORT_LIST, data.sports));
        });
    };
};