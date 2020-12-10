import Taro from "@tarojs/taro";
import { baseUrl } from "../config/config";
import qs from "qs";

export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            Taro.showLoading({
                title: "加载中",
                mask: true,
            });
            Taro.request({
                url: baseUrl + url + "?" + qs.stringify(params),
                method: "GET",
                header: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
                success: (res) => {
                    Taro.hideLoading();
                    resolve(res.data);
                },
                fail: (err) => {
                    Taro.hideLoading();
                    reject(err);
                },
            });
        });
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            Taro.showLoading({
                title: "加载中",
                mask: true,
            });
            Taro.request({
                url: baseUrl + url,
                data: qs.stringify(params),
                method: "POST",
                header: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
                success: (res) => {
                    Taro.hideLoading();
                    resolve(res.data);
                },
                fail: (err) => {
                    Taro.hideLoading();
                    reject(err);
                },
            });
        });
    },
};
