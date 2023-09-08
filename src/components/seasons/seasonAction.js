import { querySeasons, queryTournments, addSeason, querySeasonById } from './graphqlRequests';
import { changeModalOpenStatus, handleFetchList, changeLoadingState, setToasterMessage, changeTriggerState } from '../shared/appStateAction';
import * as SeasonActionType from '../shared/type';

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        return querySeasons(pageNum, pageSize).then((data) => {
            const seasonPage = data.paginatedSeasons;
            dispatch(handleFetchList(SeasonActionType.LIST_SEASON, { ...seasonPage, status: 200 }));
        }).catch((error) => {
            const { message } = error.response.errors[0];
            console.log('error message ', message);
            if (message == '401: Unauthorized') {
                localStorage.setItem('odds-user-info', "");
                dispatch(handleFetchList(SeasonActionType.LIST_SEASON, { status: 401 }));
            }
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
                dispatch(fetchList(pageNum, 5));
            }, 2000);

            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        }).catch((err) => {
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

export const fetchSeasonDetails = (id) => {
    return dispatch => {
        querySeasonById(id).then((data) => {
            console.log('season data ', data);
            dispatch(handleFetchList(SeasonActionType.FETCH_SEASON_DETAILS, data.season));
        });
    };
};