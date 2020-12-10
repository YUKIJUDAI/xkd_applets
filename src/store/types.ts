export const SET_LOG = "SET_LOG";

export interface SetLogAction {
    type: typeof SET_LOG;
    value: { [propsName: string]: any };
}

export const SET_LIST = "SET_LIST";

export interface SetListAction {
    type: typeof SET_LIST;
    value: { [propsName: string]: any };
}

export const SET_TT_INFO = "SET_TT_INFO";

export interface SetTtInfoAction {
    type: typeof SET_TT_INFO;
    value: { [propsName: string]: any };
}
