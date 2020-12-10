import React, { Component } from "react";
import { View, Text, Textarea, Input } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import { AtToast, AtButton } from "taro-ui";

import "./feedback.less";

interface State {
    type: number;
    files: Array<{ url: string }>;
    isOpened: boolean;
}

export default class feedback extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            type: 0,
            files: [],
            isOpened: false,
        };
    }

    listArray: Array<string> = ["功能异常", "产品建议", "投诉", "其他"];

    onChange(files) {
        this.setState({
            files,
        });
    }

    render() {
        return (
            <View className="feedback">
                <View className="feedback-top">
                    <View className="feedback-type">
                        <View className="feedback-title font14 color333">
                            反馈类型<Text className="color999">（必填）</Text>
                        </View>
                        <View className="feedback-btn-list flexsb">
                            {this.listArray.map((item, i) => {
                                return (
                                    <View
                                        className={`feedback-btn font12 color999 ${
                                            this.state.type === i
                                                ? "active"
                                                : null
                                        }`}
                                        key={i}
                                        onClick={() =>
                                            this.setState({ type: i })
                                        }
                                    >
                                        {item}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View className="feedback-msg font14 color333">
                        <View className="feedback-title">
                            反馈信息<Text className="color999">（必填）</Text>
                        </View>
                        <Textarea
                            style="width:100%;min-height:100PX;color:#999"
                            autoHeight
                            placeholder="请填写10字以上的描述以便我们提供更好的帮助"
                        />
                    </View>
                </View>
                <View className="feedback-middle">
                    <View className="feedback-title font14 color333">
                        添加图片<Text className="color999">（选填）</Text>
                        <Text className="fr">{this.state.files.length}/9</Text>
                    </View>
                    <AtImagePicker
                        length={5}
                        count={9}
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                    ></AtImagePicker>
                </View>
                <View className="feedback-bottom">
                    <View className="feedback-title font14 color333">
                        联系方式<Text className="color999">（选填）</Text>
                    </View>
                    <Input
                        type="text"
                        className="font12 color999"
                        placeholder="QQ/微信/手机号～"
                    />
                </View>
                <AtButton
                    type="primary"
                    className="feedback-sub"
                    onClick={() => {
                        this.setState({ isOpened: true });
                    }}
                >
                    提交反馈
                </AtButton>
                <AtToast
                    isOpened={this.state.isOpened}
                    text="反馈成功"
                    status="success"
                ></AtToast>
            </View>
        );
    }
}
