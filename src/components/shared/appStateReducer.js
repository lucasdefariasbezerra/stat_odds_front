import * as AppActionType from '../shared/type';

const INITIAL_STATE = {
    isLoading: false,
    triggerNotification: false,
    toasterInfo: { message: 'default message'}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppActionType.CHANGE_LOADING_STATE:
            return { ...state, isLoading: action.payload };
        case AppActionType.CHANGE_NOTIFICATION_STATE:
            return { ...state, triggerNotification: action.payload };
        case AppActionType.SET_TOASTER_INFO:
            return { ...state, toasterInfo: action.payload };
        default: {
            return state;
        }
    }
};