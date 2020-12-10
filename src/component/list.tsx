import React, { Component } from "react";
import { View } from "@tarojs/components";

import Navigation from "../component/navigation";
import TextList from "../component/testList";
import { mini_app_id } from "../config/config";
import http from "../util/http";

interface State {
    list: Array<any>;
}

class List extends Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentWillMount() {
        this.getList();
    }
    
    async getList() {
        const result: any = await http.post("/goods/index", {
            is_recommend: 0,
            mini_app_id,
        });
        if (result.code !== 200) return;
        const data = result.result;
        this.setState({ list: Object.values(data) });
    }

    render() {
        return (
            <View className="index-list">
                <Navigation src="game" title="趣味精选"></Navigation>
                {this.state.list.map((item, i) => {
                    return <TextList data={item} key={i}></TextList>;
                })}
            </View>
        );
    }
}

export default List;
