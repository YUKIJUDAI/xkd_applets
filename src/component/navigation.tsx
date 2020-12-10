import React from "react";
import { View, Image, Text } from "@tarojs/components";

interface Props {
    src: string;
    title: string;
}

export const Navigation: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <View className="navigation">
            <Image
                src={
                    require("../static/icon/icon-" + props.src + ".png").default
                }
                className="navigation-img"
            ></Image>
            <Text className="navigation-title fontb">{props.title}</Text>
            <Text className="fontb fr"></Text>
        </View>
    );
};

export default Navigation;
