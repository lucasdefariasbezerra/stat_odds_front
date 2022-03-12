import * as MatchType from '../shared/type';

const INITIAL_STATE = {
    page: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MatchType.LIST_MATCHES:
            return { ...state, page: action.payload };
        case MatchType.SAVE_MATCH:
            return { ...state, page: action.payload };
        default: {
            return state;
        }
    }
};