import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import Taro from "@tarojs/taro";
import { logReducer, resultReducer, ttinfoReducer } from "./reducers";

const composeEnhancers = compose;

const middlewares = [thunkMiddleware];

const rootReducer = combineReducers({
    log: logReducer,
    result: resultReducer,
    ttInfo: ttinfoReducer,
});

if (
    process.env.NODE_ENV === "development" &&
    process.env.TARO_ENV !== "quickapp"
) {
    middlewares.push(require("redux-logger").createLogger());
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default function configStore() {
    const store = createStore(
        rootReducer,
        {
            log: Taro.getStorageSync("log") || {},
            result: Taro.getStorageSync("result") || {},
            ttInfo: Taro.getStorageSync("ttInfo") || {},
        },
        enhancer
    );
    return store;
}
