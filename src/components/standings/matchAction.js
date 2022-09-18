import { queryPaginatedMatches, saveMatchesScore } from './graphqlRequests';
import { changeModalOpenStatus, changeTriggerState, handleFetchList } from '../shared/appStateAction';
import * as MatchType from '../shared/type';
import { identity } from 'lodash';

export const fetchMatchList = (pageNum, pageSize, seasonId) => {
    return dispatch => {
        return queryPaginatedMatches(pageNum, pageSize, seasonId).then((data) => {
            dispatch(handleFetchList(MatchType.LIST_MATCHES, data.paginatedMatches));
        });
    };
};

export const setToasterMessage = (toasterObj) => {
    return { type: MatchType.SET_TOASTER_INFO, payload: toasterObj };
};

export const handleMatchSave = (page, list) => {
    const newPage = { ...page, items: list };
    return { type: MatchType.SAVE_MATCH, payload: newPage };
};

export const changeLoadingState = (loading) => {
    return { type: MatchType.CHANGE_LOADING_STATE, payload: loading };
};

export const handleScoreSave = (matchesList) => {
    return dispatch => {
        const mappedPayload = matchesList.map( current => {
            return { id: parseInt(current.id), scoreHome: current.scoreHome, scoreAway: current.scoreAway };
        });
        saveMatchesScore(mappedPayload).then((data) => {
            const { description } = data.updateScores;
            dispatch(setToasterMessage({message: description, type: 'success'}));
            dispatch(changeTriggerState(true));
            dispatch(changeLoadingState(false));

            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        });
    };
};