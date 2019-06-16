import * as TeamActionType from './type';

const INITIAL_STATE = {
    page: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TeamActionType.LIST_TEAM:
            return { ...state, page: action.payload };
        default: {
            return state;
        }
    }
};