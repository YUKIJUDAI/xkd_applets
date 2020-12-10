import React, { Component } from "react";
import Taro from "@tarojs/taro";
import {
    View,
    Swiper,
    SwiperItem,
    Image,
    Text,
    Button,
} from "@tarojs/components";
import { connect } from "react-redux";

import Navigation from "../../component/navigation";
import TextList from "../../component/testList";
import { setList } from "../../store/actions";
import { mini_app_id, qnUrl } from "../../config/config";
import { TestListType } from "../../data/data";
import http from "../../util/http";

import "./index.less";

interface State {
    list: Array<TestListType>;
    bannerList: Array<{ [propsName: string]: any }>;
}

@connect(
    ({ list }) => ({ list }),
    (dispatch) => ({
        setList(value) {
            dispatch(setList(value));
        },
    })
)
class Index extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            bannerList: [],
        };
    }

    componentWillMount() {
        this.getList();
        this.getBanner();
    }

    async getBanner() {
        const result: any = await http.post("/ads/index", { place: 2 });
        if (result.code !== 200) return;
        this.setState({ bannerList: Object.values(result.result) });
    }

    async getList() {
        const result: any = await http.post("/goods/index", {
            is_recommend: 1,
            mini_app_id,
        });
        if (result.code !== 200) return;
        const data = JSON.parse(result.result);
        this.props.setList(data);
        this.setState({ list: Object.values(data) });
    }

    toTest(id: string | number) {
        Taro.navigateTo({ url: `/pages/dotests/dotests?id=${id}` });
    }

    render() {
        return (
            <View className="index">
                <Swiper autoplay>
                    {this.state.bannerList.map((item, i) => {
                        return (
                            <SwiperItem key={i}>
                                <Image
                                    src={qnUrl + item.img}
                                    className="index-swiper-banner-img"
                                ></Image>
                            </SwiperItem>
                        );
                    })}
                </Swiper>
                <View className="index-recommend">
                    <Navigation src="love" title="人气推荐"></Navigation>
                    <View className="index-swiper">
                        <Swiper autoplay>
                            {this.state.list.map((item, i) => {
                                return (
                                    <SwiperItem key={i}>
                                        <View className="index-swiper-item">
                                            <View className="index-swiper-item-left">
                                                <Image
                                                    src={qnUrl + item.logo}
                                                    className="index-swiper-item-left-img"
                                                ></Image>
                                            </View>
                                            <View className="index-swiper-item-right">
                                                <View className="index-swiper-item-right-title fontb font16">
                                                    {item.name}
                                                </View>
                                                <View className="index-swiper-item-right-con font12 color999">
                                                    {item.description}
                                                </View>
                                                <View className="index-swiper-item-hot">
                                                    <Image
                                                        className="index-swiper-item-hot-img"
                                                        src={
                                                            require("../../static/icon/icon-hot.png")
                                                                .default
                                                        }
                                                    ></Image>
                                                    <Text className="font11 color999">
                                                        {item.hot}
                                                    </Text>
                                                    <Button
                                                        type="primary"
                                                        size="mini"
                                                        className="font12 fr"
                                                        onClick={() =>
                                                            this.toTest(
                                                                item.unique_code
                                                            )
                                                        }
                                                    >
                                                        测试
                                                    </Button>
                                                </View>
                                            </View>
                                        </View>
                                    </SwiperItem>
                                );
                            })}
                        </Swiper>
                    </View>
                </View>
                <View className="index-list">
                    <Navigation src="game" title="趣味精选"></Navigation>
                    {this.state.list.map((item, i) => {
                        return <TextList data={item} key={i}></TextList>;
                    })}
                </View>
            </View>
        );
    }
}

export default Index;
