import { SET_LOG, SET_LIST, SET_TT_INFO } from "./types";

export function setLog(value: any) {
    return {
        type: SET_LOG,
        value,
    };
}

export function setList(value: any) {
    return {
        type: SET_LIST,
        value,
    };
}

export function setTtInfo(value: any) {
    return {
        type: SET_TT_INFO,
        value,
    };
}
