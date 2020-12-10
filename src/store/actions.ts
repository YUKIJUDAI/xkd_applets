import { SET_LOG, SET_RESULT, SET_TT_INFO, RESET_LOG } from "./types";

export function setLog(value: any) {
    return {
        type: SET_LOG,
        value,
    };
}

export function reSetLog(value: any) {
    return {
        type: RESET_LOG,
        value,
    };
}

export function setResult(value: any) {
    return {
        type: SET_RESULT,
        value,
    };
}

export function setTtInfo(value: any) {
    return {
        type: SET_TT_INFO,
        value,
    };
}
