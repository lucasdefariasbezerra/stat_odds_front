import { querySeasons, queryTournments, addSeason } from './graphqlRequests';
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
    if (!currentObject) {
        return { type: SeasonActionType.UPDATE_SEASON, payload: {} };
    }
    const newObject = { ...currentObject, [field]: value};
    return { type: SeasonActionType.UPDATE_SEASON, payload: newObject };
 };

 export const executeInsertion = (season, pageNum) => {
    return dispatch => {
        return addSeason(season).then((data) => {
            dispatch(setToasterMessage({message: 'new season was inserted', type: 'success'}));
            dispatch(changeTriggerState(true));
            dispatch(changeLoadingState(false));
            setTimeout(() => {
                dispatch(handleUpdate());
                dispatch(changeModalOpenStatus(SeasonActionType.CHANGE_NEW_SEASON_MODAL_STATE, false));
                dispatch(fetchList(pageNum, 7));
            }, 2000);

            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        }).catch((err) => {
            console.error('err ', err);
            dispatch(setToasterMessage({message: err.response.errors[0].message, type: 'error'}));
            dispatch(changeLoadingState(false));
            dispatch(changeTriggerState(true));
            dispatch(changeModalOpenStatus(SeasonActionType.CHANGE_NEW_SEASON_MODAL_STATE, false));
            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        });
    };
};

export const changeTriggerState = (notification) => {
    return { type: SeasonActionType.CHANGE_NOTIFICATION_STATE, payload: notification };
};

export const setToasterMessage = (toasterObj) => {
    return { type: SeasonActionType.SET_TOASTER_INFO, payload: toasterObj };
};

export const changeLoadingState = (loading) => {
    return { type: SeasonActionType.CHANGE_LOADING_STATE, payload: loading };
};