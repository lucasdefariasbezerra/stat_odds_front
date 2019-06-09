import * as TeamActionType from './type';

const INITIAL_STATE = {
    list: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TeamActionType.LIST_TEAM:
            return { ...state, list: action.payload };
        default: {
            return state;
        }
    }
};