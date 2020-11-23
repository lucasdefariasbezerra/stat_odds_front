import * as TeamActionType from './type';

const INITIAL_STATE = {
    page: {},
    teamDetails: {},
    sports: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TeamActionType.LIST_TEAM:
            return { ...state, page: action.payload };
        case TeamActionType.TEAM_DETAILS:
            return { ...state, teamDetails: action.payload };
        case TeamActionType.SPORT_LIST:
            return { ...state, sports: action.payload };
        default: {
            return state;
        }
    }
};