import { queryTeams, queryTeamDetails, querySports, queryCountries, updateTeams, addTeam } from './graphqlRequests';
import { changeModalOpenStatus } from '../shared/appStateAction';
import * as TeamActionType from '../shared/type';

const handleFetchList = (type, content) => {
    return { type, payload: content };
};

const handleTeamDetails = (data) => {
    return { type: TeamActionType.TEAM_DETAILS, payload: data.team };
};

export const setToasterMessage = (toasterObj) => {
    return { type: TeamActionType.SET_TOASTER_INFO, payload: toasterObj };
};

export const handleUpdate = (currentObject, field, value) => {
   const newObject = { ...currentObject, [field]: value};
   return { type: TeamActionType.UPDATE_TEAM, payload: newObject };
};

export const fetchList = (pageNum, pageSize) => {
    return dispatch => {
        return queryTeams(pageNum, pageSize).then((data) => {
            dispatch(handleFetchList(TeamActionType.LIST_TEAM, data.paginatedTeams));
        });
    };
};

export const executeUpdate = (team, pageNum) => {
    return dispatch => {
        return updateTeams(team).then((data) => {
            dispatch(setToasterMessage({message: 'update was successfully done', type: 'success'}));
            dispatch(changeTriggerState(true));
            dispatch(changeLoadingState(false));
            setTimeout(() => {
                dispatch(changeModalOpenStatus(TeamActionType.CHANGE_MODAL_STATE, false));
                dispatch(fetchList(pageNum, 7));
               }, 2000);
               setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        });
    };
};

export const executeInsertion = (team, pageNum) => {
    return dispatch => {
        return addTeam(team).then((data) => {
            dispatch(setToasterMessage({message: 'new team was inserted', type: 'success'}));
            dispatch(changeTriggerState(true));
            dispatch(changeLoadingState(false));
            setTimeout(() => {
                dispatch(changeModalOpenStatus(TeamActionType.CHANGE_NEW_TEAM_MODAL_STATE, false));
                dispatch(fetchList(pageNum, 7));
            }, 2000);

            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        }).catch((err) => {
            dispatch(setToasterMessage({message: err.response.errors[0].message, type: 'error'}));
            dispatch(changeLoadingState(false));
            dispatch(changeTriggerState(true));
            dispatch(changeModalOpenStatus(TeamActionType.CHANGE_NEW_TEAM_MODAL_STATE, false));
            setTimeout(() => {
                dispatch(changeTriggerState(false));
            }, 7000);
        });
    };
};

export const openAddTeam = () => {
    return { type: TeamActionType.TEAM_DETAILS, payload: {name: '', sport: {id: '1', name: 'soccer'}, country: {id: '1', name: 'Argentina'}}};
};

export const changeLoadingState = (loading) => {
    return { type: TeamActionType.CHANGE_LOADING_STATE, payload: loading };
};

export const changeTriggerState = (notification) => {
    return { type: TeamActionType.CHANGE_NOTIFICATION_STATE, payload: notification };
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

export const fetchCountries = () => {
    return dispatch => {
        return queryCountries().then(data => {
            dispatch(handleFetchList(TeamActionType.COUNTRY_LIST, data.countries));
        });
    };
};