import { queryTeams, queryTeamDetails } from './graphqlRequests';
import * as TeamActionType from './type';

const handleFetchList = (data) => {
    console.log('data ', data);
    return { type: TeamActionType.LIST_TEAM, payload: data.paginatedTeams };
};

const handleTeamDetails = (data) => {
    console.log('details ', data);
    return { type: TeamActionType.TEAM_DETAILS, payload: data.team };
};

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        return queryTeams(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(data));
        });
    };
};

export const fetchTeamDetails = (id) => {
    return dispatch => {
        return queryTeamDetails(id).then((data) => {
            dispatch(handleTeamDetails(data));
        });
    };
};