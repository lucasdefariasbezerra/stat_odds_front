import * as TeamActionType from '../shared/type';

const INITIAL_STATE = {
    page: {},
    teamDetails: {},
    sports: [],
    countries: [],
    isOpened: false,
    isNewTeamOpened: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TeamActionType.LIST_TEAM:
            return { ...state, page: action.payload };
        case TeamActionType.TEAM_DETAILS:
            return { ...state, teamDetails: action.payload };
        case TeamActionType.SPORT_LIST:
            return { ...state, sports: action.payload };
        case TeamActionType.COUNTRY_LIST:
            return { ...state, countries: action.payload };
        case TeamActionType.UPDATE_TEAM:
            return { ...state, teamDetails: action.payload };
        case TeamActionType.CHANGE_MODAL_STATE:
            return { ...state, isOpened: action.payload };
        case TeamActionType.CHANGE_NEW_TEAM_MODAL_STATE:
            return { ...state, isNewTeamOpened: action.payload };
        default: {
            return state;
        }
    }
};