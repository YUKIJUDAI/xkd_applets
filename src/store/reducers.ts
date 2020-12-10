import Taro from "@tarojs/taro";
import {
    SET_LOG,
    SetLogAction,
    SET_LIST,
    SetListAction,
    SET_TT_INFO,
    SetTtInfoAction,
} from "./types";

export function logReducer(state, action: SetLogAction) {
    switch (action.type) {
        case SET_LOG:
            let newState = Object.assign({ ...state }, action.value);
            Taro.setStorageSync("log", newState);
            return newState;
        default:
            return { ...state };
    }
}

export function listReducer(state, action: SetListAction) {
    switch (action.type) {
        case SET_LIST:
            let newState = Object.assign({ ...state }, action.value);
            Taro.setStorageSync("list", newState);
            return newState;
        default:
            return { ...state };
    }
}

export function ttinfoReducer(state, action: SetTtInfoAction) {
    switch (action.type) {
        case SET_TT_INFO:
            let newState = Object.assign({ ...state }, action.value);
            Taro.setStorageSync("ttInfo", newState);
            return newState;
        default:
            return { ...state };
    }
}
