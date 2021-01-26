import * as SeasonActionType from '../shared/type';

const INITIAL_STATE = {
    page: {},
    seasonDetails: {},
    isOpened: false,
    isNewSeasonOpened: false,
    tournments: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SeasonActionType.LIST_SEASON:
            return { ...state, page: action.payload };
        case SeasonActionType.CHANGE_NEW_SEASON_MODAL_STATE:
            return { ...state, isNewSeasonOpened: action.payload };
        case SeasonActionType.UPDATE_SEASON:
            return { ...state, seasonDetails: action.payload };
        case SeasonActionType.LIST_TOURNMENT:
            return { ...state, tournments: action.payload };
        default: {
            return state;
        }
    }
};