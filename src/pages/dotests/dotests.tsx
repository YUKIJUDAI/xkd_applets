import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar, AtCurtain } from "taro-ui";
import { connect } from "react-redux";

import { setLog } from "../../store/actions";
import { getQuestion } from "../../data/index";
import { qnUrl } from "../../config/config";

import "./dotests.less";

@connect(
    ({ list }) => ({ list }),
    (dispatch) => ({
        setLog(value) {
            dispatch(setLog(value));
        },
    })
)
export default class dotests extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        // this.ad = Taro.createRewardedVideoAd({
        //     adUnitId: "clb1d219jdjdmqih2i",
        // });
        // this.ad.onClose((res) => {
        //     if (res.isEnded) {
        //         Taro.redirectTo({
        //             url: `/pages/result/result?id=${
        //                 this.paramsId
        //             }&res=${this.state.alist.join("")}`,
        //         });
        //     }
        // });
    }

    ad: any = null;

    paramsId = (Taro.Current.router as any).params.id;

    data = getQuestion((Taro.Current.router as any).params.id);

    state = {
        index: 0,
        alist: [],
        active: null,
        started: false,
        isOpened: false,
    };

    // 开始答题
    start() {
        this.setState({ started: true });
        this.props.setLog({ [this.paramsId]: new Date().getTime() });
    }

    // 切换数组到字母
    changeNums(num: number): string {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num];
    }
    // 下一题
    next(num: number) {
        let arr: Array<number> = [...this.state.alist];
        arr.push(num);
        this.setState({ active: num, alist: arr });
        setTimeout(() => {
            if (this.state.index === +this.data.list.length - 1) {
                this.setState({ isOpened: true });
                return;
            }
            this.setState({
                index: this.state.index + 1,
                active: null,
            });
        }, 300);
    }
    // 打开广告
    openAd() {
        this.ad.show();
    }

    render() {
        return (
            <View>
                {this.state.started && (
                    <View className="dotests">
                        <View>
                            <View className="dotests-right font16">
                                {this.state.index + 1}/{this.data.list.length}
                            </View>
                            <View className="dotests-top flexs">
                                <AtAvatar
                                    circle
                                    size="large"
                                    image={
                                        qnUrl +
                                        this.props.list[this.paramsId].logo
                                    }
                                ></AtAvatar>
                                <View className="dotests-title color333 font18 fontb">
                                    {this.props.list[this.paramsId].name}
                                </View>
                            </View>
                            <View className="dotests-bottom">
                                <Image
                                    className="dotests-love"
                                    src={
                                        require("../../static/icon/icon-love2.png")
                                            .default
                                    }
                                ></Image>
                                <View className="dotests-main">
                                    <View className="dotests-q font18">
                                        {this.data.list[this.state.index].q}
                                    </View>
                                    <View className="dotests-a">
                                        {this.data.list[this.state.index].a.map(
                                            (item, i) => {
                                                return (
                                                    <View
                                                        className={`dotests-list flexs ${
                                                            this.state
                                                                .active === i
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        key={i}
                                                        onClick={() =>
                                                            this.next(i)
                                                        }
                                                    >
                                                        <View className="dotests-nums colorfff font14">
                                                            {this.changeNums(i)}
                                                        </View>
                                                        <View className="dotests-list-text font14">
                                                            {item}
                                                        </View>
                                                    </View>
                                                );
                                            }
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                {!this.state.started && (
                    <View
                        className="dotests-enter"
                        onClick={() => {
                            this.start();
                        }}
                    >
                        <Image
                            className="dotests-enter-img"
                            mode="widthFix"
                            src={qnUrl + "xcp-enter-" + this.paramsId}
                        ></Image>
                        <view className="dotests-fixed">
                            <Image
                                className="dotests-enter-btn"
                                mode="widthFix"
                                src={
                                    require("../../static/img/start-btn.png")
                                        .default
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
