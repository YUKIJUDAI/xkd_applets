import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";

import { View, Image, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";

import { reSetLog } from "../../store/actions";
import { qnUrl } from "../../config/config";

import "./me.less";

interface State {
    hasLog: boolean;
    logList: Array<{ [propsName: string]: any }>;
}

// 没有记录
function NoLog() {
    return <View className="no-log fontb">还没有测试记录哦～</View>;
}

// 有历史记录
function HasLog(props) {
    return (
        <View className="has-log">
            {props.data.map((item, i) => {
                return (
                    <View className="log-list" key={i}>
                        <View className="log-time fontb font14 color333">
                            完成时间：{item.time}
                        </View>
                        <View className="log-content flexs">
                            <Image
                                className="log-content-left"
                                src={qnUrl + item["goods-img"]}
                            ></Image>
                            <View className="log-content-right">
                                <View className="fontb font14 color333">
                                    {item["goods-title"]}
                                </View>
                                <View className="font12 color999 log-content-right-content">
                                    {item.description}
                                </View>
                                <View className="font11 color999">
                                    共{item.number}题
                                </View>
                            </View>
                        </View>
                        <View className="log-btn flexe">
                            <View
                                className="log-btn-no font12 color999"
                                onClick={() => props.toDel(item.id)}
                            >
                                删除
                            </View>
                            <View
                                className="log-btn-yes font12 color333"
                                onClick={() => props.toTest(item.id)}
                            >
                                开始
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

@connect(
    ({ log, ttInfo }) => ({ log, ttInfo }),
    (dispatch) => ({
        reSetLog(value) {
            dispatch(reSetLog(value));
        },
    })
)
export default class Me extends Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            hasLog: false,
            logList: [],
        };
    }

    componentDidMount() {
        this.changeLog(this.props.log);
    }
    componentWillReceiveProps({ log }) {
        this.changeLog(log);
    }

    changeLog(log) {
        // 判断是否存在记录
        if (Object.keys(log).length !== 0) {
            this.setState({ hasLog: true });
            let logList: Array<{ [propsName: string]: any }> = [];

            logList = Object.values(log);
            this.setState({ logList });
        }
    }

    toTest(id: string | number) {
        Taro.navigateTo({ url: `/pages/dotests/dotests?id=${id}` });
    }

    toFeedback() {
        Taro.navigateTo({ url: "/pages/feedback/feedback" });
    }

    toDel = (id) => {
        let data = JSON.parse(JSON.stringify(this.props.log));
        delete data[id];
        this.props.reSetLog(data);
    };

    render() {
        return (
            <View className="me">
                <View className="me-top flexs">
                    <AtAvatar
                        circle
                        size="large"
                        image={this.props.ttInfo.avatarUrl}
                    ></AtAvatar>
                    <View className="me-right">
                        <View className="fontb">
                            {this.props.ttInfo.nickName}
                        </View>
                        {this.props.ttInfo.phone && (
                            <View className="me-right-id">
                                {this.props.ttInfo.phone}
                            </View>
                        )}
                    </View>
                </View>
                <View className="me-recording">
                    <View className="me-recording-title fontb font14">
                        测评记录
                    </View>
                    <View className="me-recording-content">
                        {this.state.hasLog ? (
                            <HasLog
                                data={this.state.logList}
                                toTest={this.toTest}
                                toDel={this.toDel}
                            />
                        ) : (
                            <NoLog />
                        )}
                    </View>
                </View>
                <View
                    className="me-feedback"
                    onClick={() => {
                        this.toFeedback();
                    }}
                >
                    <View className="me-edit">
                        <Image
                            className="me-edit-img"
                            src={
                                require("../../static/icon/icon-edit.png")
                                    .default
                            }
                        ></Image>
                        <Text className="fontb font14">意见反馈</Text>
                    </View>
                </View>
            </View>
        );
    }
}
