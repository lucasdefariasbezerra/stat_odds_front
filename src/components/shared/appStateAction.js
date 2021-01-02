import * as ActionType from '../shared/type';

export const changeModalOpenStatus = (type, payload) => {
    return { type, payload };
};

export const changePageNum = (pageNum) => {
    return { type: ActionType.CHANGE_PAGE_NUM, payload: pageNum };
};