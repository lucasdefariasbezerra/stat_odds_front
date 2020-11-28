import * as AppActionType from '../shared/type';

const INITIAL_STATE = {
    isLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppActionType.CHANGE_LOADING_STATE:
            return { ...state, isLoading: action.payload };
        default: {
            return state;
        }
    }
};