import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { AtActivityIndicator, AtToast } from "taro-ui";
import { connect } from "react-redux";

import { qnUrl } from "../../config/config";
import { compareVersionEle } from "../../util/util";
import HomeBtn from "../../component/homebtn";
import List from "../../component/list";
import http from "../../util/http";

import "./result.less";

@connect((result) => result)
export default class result extends Component<
    any,
    { [PropsName: string]: any }
> {
    constructor(props) {
        super(props);
        this.state = {
            img: "",
            isOpen: true,
            isOpened: false,
            isDownloadSuccess: false,
            isDownloadError: false,
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
        };
    }

    paramsId = (Taro.Current.router as any).params.id;

    componentWillMount() {
        // 获取数据
        http.get(qnUrl + "xkd_goods_" + this.paramsId + ".json").then(
            (res: any) => {
                if (res.result.process === "server") {
                    // todo
                    return;
                }
                this.setState({ data: res });
                switch (res.result.type) {
                    // 关键因子
                    case "keyfactor":
                        this.keyfactor(res.result.expand);
                        return;
                    // 分值
                    case "point":
                        this.point(res.result.expand);
                        return;
                    //随机
                    case "random":
                        this.rand();
                        return;
                    // 固定选项
                    case "logic":
                        this.logic(
                            res.item.list[res.item.list.length - 1].answer
                        );
                        return;
                    // 最多返回
                    case "statis":
                        this.statis();
                        return;
                    default:
                        return;
                }
            }
        );
    }

    onShareAppMessage() {
        return {
            path: "/pages/dotests/dotests?id=" + this.paramsId,
        };
    }

    // 分享
    share() {
        const system: any = Taro.getSystemInfoSync();
        if (!compareVersionEle(system.SDKVersion, "1.5.0")) {
            this.setState({ isOpened: true });
        }
    }

    // 重新测试
    retest() {
        Taro.reLaunch({ url: "/pages/dotests/dotests?id=" + this.paramsId });
    }

    // 获取授权
    userAuthorization() {
        Taro.getSetting({
            success: (res) => {
                if (!res.authSetting["scope.writePhotosAlbum"]) {
                    Taro.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: () => {
                            this.saveImg();
                        },
                    });
                } else {
                    this.saveImg();
                }
            },
        });
    }

    // 保存图片
    saveImg() {
        Taro.downloadFile({
            url: qnUrl + this.state.img,
            success: (res) => {
                Taro.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: () => {
                        this.setState({ isDownloadSuccess: true });
                    },
                    fail: () => {
                        this.setState({ isDownloadError: true });
                    },
                });
            },
        });
    }

    // 根据最后一个选项
    keyfactor(expand: any) {
        const img = this.state.data.result.item[
            this.props.result[this.paramsId][expand.answer].val
        ];
        this.setState({ img });
    }
    // 分值加减
    point(expand: any) {
        var sum: number = 0;
        var index: number = 0;
        this.state.data.item.list.map((item, i) => {
            sum += +item.answer[this.props.result[this.paramsId][i].val].point;
        });

        if (Array.isArray(expand)) {
            expand.map((item, i) => {
                if (item.min <= sum && item.max >= sum) {
                    index = i;
                    return;
                }
            });
        }
        const img = this.state.data.result.item[index];
        this.setState({ img });
    }
    // 随机
    rand() {
        const img = this.state.data.result.item[
            Math.floor(Math.random() * this.state.data.result.item.length)
        ];
        this.setState({ img });
    }
    // 固定返回
    logic(answer: Array<{ [propsName: string]: any }>) {
        const index = this.props.result[this.paramsId][
            this.props.result[this.paramsId].length - 1
        ].val;
        let result = answer[index].result;
        if (result.includes(",")) {
            result = result.split(",");
            const img = this.state.data.result.item[
                result[Math.floor(Math.random() * result.length)]
            ];
            this.setState({ img });
            return;
        }
        const img = this.state.data.result.item[answer[index].result];
        this.setState({ img });
    }
    // 最多选项
    statis() {
        let string = [...this.props.result[this.paramsId]],
            maxValue = "",
            obj = {},
            max = 0;
        string.forEach((value) => {
            obj[value["val"]] =
                obj[value["val"]] == undefined ? 1 : obj[value["val"]] + 1;
            if (obj[value["val"]] > max) {
                max = obj[value["val"]];
                maxValue = value["val"];
            }
        });
        const img = this.state.data.result.item[+maxValue];
        this.setState({ img });
    }

    render() {
        return (
            <View className="result">
                <HomeBtn type="home"></HomeBtn>
                <AtActivityIndicator
                    isOpened={this.state.isOpen}
                    content="加载中..."
                    mode="center"
                    size={48}
                ></AtActivityIndicator>
                <Image
                    style={{ width: "100vw" }}
                    mode="widthFix"
                    src={qnUrl + this.state.img}
                    onLoad={() => {
                        this.setState({ isOpen: false });
                    }}
                ></Image>
                <AtToast
                    isOpened={this.state.isOpened}
                    text="当前客户端版本过低，无法使用该功能，请升级客户端或关闭后重启更新。"
                    status="error"
                ></AtToast>
                <AtToast
                    isOpened={this.state.isDownloadSuccess}
                    text="图片保存成功"
                    status="success"
                ></AtToast>
                <AtToast
                    isOpened={this.state.isDownloadError}
                    text="图片保存失败"
                    status="error"
                ></AtToast>
                <View className="result-btn">
                    <Image
                        className="result-btn-img"
                        mode="widthFix"
                        src={require("../../static/img/save.png").default}
                        onClick={() => {
                            this.userAuthorization();
                        }}
                    ></Image>
                    <Button
                        className="share-btn"
                        open-type="share"
                        onClick={() => {
                            this.share();
                        }}
                    ></Button>
                    <Image
                        className="result-btn-img"
                        mode="widthFix"
                        src={require("../../static/img/retest.png").default}
                        onClick={() => {
                            this.retest();
                        }}
                    ></Image>
                </View>
                <View className="result-list">
                    <List></List>
                </View>
            </View>
        );
    }
}
