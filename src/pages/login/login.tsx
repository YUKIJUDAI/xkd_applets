import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import { setTtInfo } from "../../store/actions";
import { decrypt } from "../../util/util";
import http from "../../util/http";

interface State {
    code: string;
}

@connect(
    ({ ttInfo }) => ({ ttInfo }),
    (dispatch) => ({
        setTtInfo(value) {
            dispatch(setTtInfo(value));
        },
    })
)
class Index extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            code: "",
        };
    }

    componentWillMount() {
        this.checkSession();
    }

    checkSession() {
        Taro.checkSession({
            success: () => {
                if (!this.props.ttInfo.session_key) {
                    this.login();
                    return;
                }
                this.getSetting();
            },
            fail: () => {
                this.login();
            },
        });
    }

    login() {
        Taro.login({
            success: async (res: any) => {
                const result: any = await http.get("/miniApp/code2Session", {
                    code: res.code,
                });
                if (result.code === 200) {
                    this.props.setTtInfo({
                        ...this.props.ttInfo,
                        session_key: result.result.session_key,
                    });
                    this.getSetting();
                }
            },
            fail: () => {},
        });
    }

    getSetting() {
        Taro.getSetting({
            success: (res) => {
                if (!res.authSetting["scope.userInfo"]) {
                    Taro.authorize({
                        scope: "scope.userInfo",
                        success: () => {
                            this.getUserInfo();
                        },
                    });
                } else {
                    this.getUserInfo();
                }
            },
        });
    }

    getUserInfo() {
        Taro.getUserInfo({
            withCredentials: true,
            success: (res) => {
                const result = decrypt(
                    res.encryptedData,
                    this.props.ttInfo.session_key,
                    res.iv
                );
                this.props.setTtInfo(Object.assign(this.props.ttInfo, result));
                this.getRelated(result.openId);
            },
        });
    }

    async getRelated(openid) {
        const result: any = await http.post("/miniApp/getUserByOpenid", {
            openid,
        });
        if (result.code === 0 && result.result.length === 0) {
            this.props.setTtInfo(
                Object.assign(this.props.ttInfo, result.result[0] || {})
            );
        }
        Taro.reLaunch({ url: "/pages/index/index" });
    }

    render() {
        return <View className="login"></View>;
    }
}

export default Index;
