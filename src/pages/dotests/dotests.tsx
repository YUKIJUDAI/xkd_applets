import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar, AtCurtain, AtProgress } from "taro-ui";
import { connect } from "react-redux";

import HomeBtn from "../../component/homebtn";

import { setLog, setResult } from "../../store/actions";
import { qnUrl } from "../../config/config";
import { compareVersionEle, changeDay } from "../../util/util";
import http from "../../util/http";

import "./dotests.less";

@connect(null, (dispatch) => ({
    setLog(value) {
        dispatch(setLog(value));
    },
    setResult(value) {
        dispatch(setResult(value));
    },
}))
export default class dotests extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        if (this.hasRewardedVideoAd()) {
            this.ad = Taro.createRewardedVideoAd({
                adUnitId: "clb1d219jdjdmqih2i",
            });
            this.ad.onClose((res) => {
                if (res.isEnded) {
                    Taro.navigateTo({
                        url: `/pages/result/result?id=${this.paramsId}`,
                    });
                }
            });
        }
        // 获取数据
        http.get(qnUrl + "xkd_goods_" + this.paramsId + ".json").then(
            (res: any) => {
                this.setState({ data: res });
            }
        );
    }

    ad: any = null;

    paramsId = (Taro.Current.router as any).params.id;

    state: any = {
        index: 0,
        data: {
            base: "",
            before: {
                "background-imgs": [],
            },
            item: {
                list: [],
            },
            result: {},
        },
        alist: [],
        active: null,
        started: false,
        isOpened: false,
        system: {},
    };

    // 开始答题
    start() {
        this.setState({ started: true });
        this.props.setLog({
            [this.paramsId]: {
                id: this.state.data.base["goods-id"],
                time: changeDay(new Date().getTime()),
                number: this.state.data.base.number,
                desc: this.state.data.base.desc,
                "goods-title": this.state.data.base["goods-title"],
                "goods-img": this.state.data.base["goods-img"],
            },
        });
    }

    // 切换数组到字母
    changeNums(num: number): string {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num];
    }

    // 判断是否兼容激励广告
    hasRewardedVideoAd() {
        const system: any = Taro.getSystemInfoSync();
        this.setState({ system });
        if (system.appName !== "Douyin") {
            return false;
        }
        if (system.platform === "android") {
            return compareVersionEle(system.SDKVersion, "1.71.0");
        } else if (system.platform === "ios") {
            return compareVersionEle(system.SDKVersion, "1.70.0");
        } else {
            return false;
        }
    }

    // 下一题
    next(val: number, goto: string) {
        let arr: Array<{ [propsName: string]: any }> = [...this.state.alist];
        const { id, point, result } = this.state.data.item.list[
            this.state.index
        ];
        arr.push({ id, val, point, result });
        this.setState({ active: val, alist: arr });
        setTimeout(() => {
            if (this.state.data.item.list[this.state.index].last) {
                this.props.setResult({ [this.paramsId]: this.state.alist });
                this.setState({ isOpened: true });
                return;
            }
            this.setState({
                index: goto ? +goto : this.state.index + 1,
                active: null,
            });
        }, 300);
    }
    // 打开广告
    openAd() {
        if (this.hasRewardedVideoAd()) {
            this.ad.show();
        } else {
            Taro.navigateTo({
                url: `/pages/result/result?id=${this.paramsId}`,
            });
        }
    }

    render() {
        return (
            <View>
                {this.state.started && (
                    <View
                        className="dotests"
                        style={{
                            background: this.state.data.item.background
                                ? "url(" +
                                  qnUrl +
                                  this.state.data.item.background +
                                  ")"
                                : require("../../static/img/dotests-bg.png")
                                      .default,
                            backgroundSize: "100%",
                        }}
                    >
                        <HomeBtn
                            type="back"
                            navigateTo={() =>
                                this.setState({
                                    index: 0,
                                    alist: [],
                                    active: null,
                                    started: false,
                                })
                            }
                        ></HomeBtn>
                        <View>
                            <View
                                className="dotests-right font16"
                                style={{
                                    boxShadow: `0PX 1PX 2PX 0PX ${this.state.data.item.border_color}`,
                                }}
                            >
                                {this.state.index + 1}/
                                {this.state.data.base.number}
                            </View>
                            <View className="dotests-top flexs">
                                <AtAvatar
                                    circle
                                    className="dotests-avatar"
                                    size="normal"
                                    image={
                                        qnUrl +
                                        this.state.data.base["goods-img"]
                                    }
                                ></AtAvatar>
                                <View
                                    className="dotests-title color333 font18 fontb"
                                    style={{
                                        color: this.state.data.item.color
                                            ? this.state.data.item.color
                                            : "#333",
                                    }}
                                >
                                    {this.state.data.base["goods-title"]}
                                </View>
                            </View>
                            <View className="dotests-bottom">
                                <View className="dotests-main" style={{"boxShadow": `0PX 3PX 12PX 4PX ${this.state.data.item.border_box_color ? this.state.data.item.border_box_color : 'afasfasfasfas'}` }}>
                                    <View className="dotests-q font18">
                                        {
                                            this.state.data.item.list[
                                                this.state.index
                                            ].title
                                        }
                                    </View>
                                    {this.state.data.item.list[this.state.index]
                                        .imgs.length > 0 && (
                                        <view className="dotests-main-img-list">
                                            {this.state.data.item.list[
                                                this.state.index
                                            ].imgs.map((item, i) => {
                                                return (
                                                    <Image
                                                        className="dotests-main-img"
                                                        src={qnUrl + item}
                                                        key={i}
                                                        mode="widthFix"
                                                    ></Image>
                                                );
                                            })}
                                        </view>
                                    )}

                                    <View className="dotests-a">
                                        {this.state.data.item.list[
                                            this.state.index
                                        ].answer.map((item, i) => {
                                            return (
                                                <View
                                                    className={`dotests-list flexs ${
                                                        this.state.active === i
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    key={i}
                                                    onClick={() =>
                                                        this.next(i, item.goto)
                                                    }
                                                >
                                                    <View className="dotests-nums colorfff font14">
                                                        {this.changeNums(i)}
                                                    </View>
                                                    {item.img && (
                                                        <Image
                                                            src={
                                                                qnUrl + item.img
                                                            }
                                                            mode="widthFix"
                                                            className="dotests-list-img"
                                                        ></Image>
                                                    )}
                                                    {item.key && (
                                                        <View className="dotests-list-text font14">
                                                            {item.key}
                                                        </View>
                                                    )}
                                                </View>
                                            );
                                        })}
                                    </View>
                                    <AtProgress
                                        className="dotests-atProgress"
                                        percent={
                                            ((this.state.index + 1) /
                                                this.state.data.base.number) *
                                            100
                                        }
                                        strokeWidth={14}
                                        isHidePercent
                                        color={
                                            this.state.data.item.border_color
                                                ? this.state.data.item
                                                      .border_color
                                                : "#666"
                                        }
                                    ></AtProgress>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                {!this.state.started && (
                    <View className="dotests-enter">
                        <HomeBtn type="home"></HomeBtn>
                        {this.state.data.before["background-imgs"].map(
                            (item, i) => {
                                return (
                                    <Image
                                        className="dotests-enter-img"
                                        mode="widthFix"
                                        src={qnUrl + item}
                                        key={i}
                                    ></Image>
                                );
                            }
                        )}
                        <view
                            className="dotests-fixed"
                            onClick={() => {
                                this.start();
                            }}
                        >
                            <Image
                                className="dotests-enter-btn"
                                mode="widthFix"
                                src={
                                    qnUrl +
                                    this.state.data.before["button-start-img"]
                                }
                            ></Image>
                        </view>
                    </View>
                )}
                <AtCurtain
                    isOpened={this.state.isOpened}
                    onClose={() => {
                        this.setState({ isOpened: false });
                    }}
                >
                    <Image
                        mode="widthFix"
                        src={require("../../static/img/finish.png").default}
                        onClick={() => {
                            this.openAd();
                        }}
                    ></Image>
                </AtCurtain>
            </View>
        );
    }
}
