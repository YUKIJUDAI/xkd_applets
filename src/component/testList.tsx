import React from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";

import { qnUrl } from "../config/config";

export const TextList: React.FunctionComponent<{
    data: any;
}> = (props: { data: any }) => {
    const toTest = (id: string | number) => {
        Taro.navigateTo({ url: `/pages/dotests/dotests?id=${id}` });
    };

    return (
        <View className="test-list clearfix">
            <View className="test-list-left fl">
                <Image
                    className="test-list-left-img"
                    src={qnUrl + props.data.logo}
                ></Image>
            </View>
            <View className="test-list-center fl">
                <View className="test-list-center-title fontb font16 color333">
                    {props.data.name}
                </View>
                <View className="test-list-center-con font12 color666">
                    {props.data.description}
                </View>
                <View className="test-list-center-hot">
                    <Image
                        className="test-list-center-hot-img"
                        src={require("../static/icon/icon-hot.png").default}
                    ></Image>
                    <Text className="font11 color999">
                        {props.data.hot}人已测
                    </Text>
                </View>
            </View>
            <View className="test-list-right fr">
                <Button
                    type="primary"
                    size="mini"
                    className="font12 test-list-right-btn"
                    onClick={() => toTest(props.data.id)}
                >
                    开始
                </Button>
            </View>
        </View>
    );
};

export default TextList;
