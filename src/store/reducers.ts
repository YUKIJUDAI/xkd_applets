import Taro from "@tarojs/taro";
import {
    SET_LOG,
    SetLogAction,
    SET_RESULT,
    SetResultAction,
    SET_TT_INFO,
    SetTtInfoAction,
    RESET_LOG,
    RESETLogAction,
} from "./types";

export function logReducer(state, action: SetLogAction | RESETLogAction) {
    switch (action.type) {
        case SET_LOG:
            let newState = Object.assign({}, state, action.value);
            Taro.setStorageSync("log", newState);
            return newState;
        case RESET_LOG:
            let reState = Object.assign({}, action.value);
            Taro.setStorageSync("log", reState);
            return reState;
        default:
            return { ...state };
    }
}

export function resultReducer(state, action: SetResultAction) {
    switch (action.type) {
        case SET_RESULT:
            let newState = Object.assign({}, state, action.value);
            Taro.setStorageSync("result", newState);
            return newState;
        default:
            return { ...state };
    }
}

export function ttinfoReducer(state, action: SetTtInfoAction) {
    switch (action.type) {
        case SET_TT_INFO:
            let newState = Object.assign({}, state, action.value);
            Taro.setStorageSync("ttInfo", newState);
            return newState;
        default:
            return { ...state };
    }
}
