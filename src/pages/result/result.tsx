import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import { getQuestion } from "../../data/index";
import { qnUrl } from "../../config/config";

export default class result extends Component<any, { img: string }> {
    constructor(props) {
        super(props);
        this.state = {
            img: "",
        };
    }

    paramsId = (Taro.Current.router as any).params.id;
    paramsRes = (Taro.Current.router as any).params.res;

    data = getQuestion(this.paramsId);

    componentWillMount() {
        switch (this.data.atype) {
            case "1":
                this.lastOptions();
                return;
            case "2":
                this.aOptions();
                return;
            case "3":
                this.rand();
                return;
            case "4":
                this.randSex();
                return;
            case "5":
                this.max();
                return;
            default:
                return;
        }
    }

    // 根据最后一个选项
    lastOptions() {
        const img = this.data.resultList[+this.paramsRes.substr(-1)];
        this.setState({ img });
    }
    // 选项a的数量
    aOptions() {
        let count = 0;
        while (this.paramsRes.indexOf("a") != -1) {
            this.paramsRes = this.paramsRes.replace("a", "");
            count++;
        }
        let i = 0;
        while (
            count / this.paramsRes.length >
            (1 / this.data.resultList.length) * (i + 1)
        ) {
            i++;
        }
        const img = this.data.resultList[i];
        this.setState({ img });
    }
    // 随机
    rand() {
        const img = this.data.resultList[
            Math.floor(Math.random() * this.data.resultList.length)
        ];
        this.setState({ img });
    }
    // 分男女随机
    randSex() {
        const sex = this.paramsRes.substr(-1);
        const img = this.data.resultList[
            Math.floor(
                (Math.random() * this.data.resultList.length) / 2 +
                    (sex === "1" ? this.data.resultList.length / 2 : 0)
            )
        ];
        this.setState({ img });
    }
    // 最多选项
    max() {
        let string = [...this.paramsRes],
            maxValue = "",
            obj = {},
            max = 0;
        string.forEach((value) => {
            obj[value] = obj[value] == undefined ? 1 : obj[value] + 1;
            if (obj[value] > max) {
                max = obj[value];
                maxValue = value;
            }
        });
        const img = this.data.resultList[+maxValue];
        this.setState({ img });
    }

    render() {
        return (
            <View className="result">
                <Image
                    style={{ width: "100vw" }}
                    mode="widthFix"
                    src={qnUrl + this.state.img}
                ></Image>
            </View>
        );
    }
}
