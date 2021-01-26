import { querySeasons, queryTournments } from './graphqlRequests';
import { changeModalOpenStatus } from '../shared/appStateAction';
import * as SeasonActionType from '../shared/type';

const handleFetchList = (type, content) => {
    return { type, payload: content };
};

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        return querySeasons(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(SeasonActionType.LIST_SEASON, data.paginatedSeasons));
        });
    };
};

export const fetchTournments = () => {
    return dispatch => {
        return queryTournments().then((data) => {
            dispatch(handleFetchList(SeasonActionType.LIST_TOURNMENT, data.tournments));
        });
    };
};

export const handleUpdate = (currentObject, field, value) => {
    const newObject = { ...currentObject, [field]: value};
    console.log('new object ', newObject);
    return { type: SeasonActionType.UPDATE_SEASON, payload: newObject };
 };