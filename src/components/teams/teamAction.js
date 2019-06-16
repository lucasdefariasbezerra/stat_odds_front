import { queryTeams } from './graphqlRequests';
import * as TeamActionType from './type';

const handleFetchList = (data) => {
    console.log('data ', data);
    return { type: TeamActionType.LIST_TEAM, payload: data.paginatedTeams };
};

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        queryTeams(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(data));
        });
    };
};