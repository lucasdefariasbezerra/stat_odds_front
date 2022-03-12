import { queryPaginatedMatches } from './graphqlRequests';
import { handleFetchList } from '../shared/appStateAction';
import * as MatchType from '../shared/type';

export const fetchMatchList = (pageNum, pageSize) => {
    return dispatch => {
        return queryPaginatedMatches(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(MatchType.LIST_MATCHES, data.paginatedMatches));
        });
    };
};

export const handleMatchSave = (page, list) => {
    const newPage = { ...page, items: list };
    return { type: MatchType.SAVE_MATCH, payload: newPage };
};