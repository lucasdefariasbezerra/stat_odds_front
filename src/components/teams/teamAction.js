import { queryTeams } from './graphqlRequests';
import * as TeamActionType from './type';

const handleFetchList = (data) => {
    return { type: TeamActionType.LIST_TEAM, payload: data.teams };
};

export const fetchList = () => {
    return dispatch => {
        queryTeams().then((data) => {
            dispatch(handleFetchList(data));
        });
    };
};