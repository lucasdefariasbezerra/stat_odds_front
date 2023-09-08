import { queryPaginatedMatches, saveMatchesScore, resetMatch } from './graphqlRequests';
import { changeModalOpenStatus, changeTriggerState, handleFetchList } from '../shared/appStateAction';
import * as MatchType from '../shared/type';
import { identity } from 'lodash';

export const fetchMatchList = (pageNum, pageSize, seasonId) => {
    return dispatch => {
        return queryPaginatedMatches(pageNum, pageSize, seasonId).then((data) => {
            const matchesPage = data.paginatedMatches;
            dispatch(handleFetchList(MatchType.LIST_MATCHES, {...matchesPage, status: 200 }));
        }).catch((error) => {
            const { message } = error.response.errors[0];
            console.log('error message ', message);
            if (message == '401: Unauthorized') {
                localStorage.setItem('odds-user-info', "");
                dispatch(handleFetchList(MatchType.LIST_MATCHES, { status: 401 }));
            }
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

export const handleScoreSave = (matchesList, pageNum, pageSize, seasonId) => {
    return dispatch => {
        const mappedPayload = matchesList.map( current => {
            return { id: parseInt(current.id), scoreHome: current.scoreHome, scoreAway: current.scoreAway };
        });
        saveMatchesScore(mappedPayload).then((data) => {
            const { description } = data.updateScores;
            const newPageNum = pageNum == 0 ? pageNum : pageNum - 1;
            dispatch(setToasterMessage({message: description, type: 'success'}));
            dispatch(changeTriggerState(true));
            dispatch(changeLoadingState(false));
            debugger;
            dispatch(fetchMatchList(newPageNum, pageSize, seasonId));

            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        });
    };
};


export const handleMatchReset = (match, pageNum, pageSize, seasonId) => {
    const mappedMatch = {id: parseInt(match.id)};
    return dispatch => {
        resetMatch(mappedMatch).then((data) => {
          debugger;
          const { resetMatch } = data;
          const newPageNum = pageNum == 0 ? pageNum : pageNum - 1;
          dispatch(setToasterMessage({message: resetMatch.description, type: 'success'}));
          dispatch(changeTriggerState(true));
          dispatch(fetchMatchList(newPageNum, pageSize, seasonId));

          setTimeout(() => {
            dispatch(changeTriggerState(false));
        }, 5000);

        });
    };
};