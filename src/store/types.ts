export const SET_LOG = "SET_LOG";

export interface SetLogAction {
    type: typeof SET_LOG;
    value: { [propsName: string]: any };
}

export const RESET_LOG = "RESET_LOG";

export interface RESETLogAction {
    type: typeof RESET_LOG;
    value: { [propsName: string]: any };
}

export const SET_RESULT = "SET_RESULT";

export interface SetResultAction {
    type: typeof SET_RESULT;
    value: { [propsName: string]: any };
}

export const SET_TT_INFO = "SET_TT_INFO";

export interface SetTtInfoAction {
    type: typeof SET_TT_INFO;
    value: { [propsName: string]: any };
}
