import * as ActionType from '../shared/type';

export const handleFetchList = (type, content) => {
    return { type, payload: content };
};

export const changeModalOpenStatus = (type, payload) => {
    return { type, payload };
};

export const changePageNum = (pageNum) => {
    return { type: ActionType.CHANGE_PAGE_NUM, payload: pageNum };
};

export const changeTriggerState = (notification) => {
    return { type: ActionType.CHANGE_NOTIFICATION_STATE, payload: notification };
};

export const setToasterMessage = (toasterObj) => {
    return { type: ActionType.SET_TOASTER_INFO, payload: toasterObj };
};

export const changeLoadingState = (loading) => {
    return { type: ActionType.CHANGE_LOADING_STATE, payload: loading };
};