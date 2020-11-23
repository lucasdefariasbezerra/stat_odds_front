import { queryTeams, queryTeamDetails, querySports } from './graphqlRequests';
import * as TeamActionType from './type';

const handleFetchList = (type, content) => {
    return { type, payload: content };
};

const handleTeamDetails = (data) => {
    return { type: TeamActionType.TEAM_DETAILS, payload: data.team };
};

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        return queryTeams(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(TeamActionType.LIST_TEAM, data.paginatedTeams));
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

export const fetchSports = () => {
    return dispatch => {
        return querySports().then(data => {
            dispatch(handleFetchList(TeamActionType.SPORT_LIST, data.sports));
        });
    };
};