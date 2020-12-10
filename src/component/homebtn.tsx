import React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

interface Prop {
    type: string;
    navigateTo?: Function;
}

export const HomeBtn: React.FunctionComponent<Prop> = (prop: Prop) => {
    const navigateTo = () => {
        if (prop.navigateTo) {
            prop.navigateTo();
            return;
        }
        prop.type === "home" && Taro.switchTab({ url: "/pages/index/index" });
        prop.type === "back" && Taro.navigateBack();
    };

    const H: any = () => Taro.getSystemInfoSync()["statusBarHeight"];

    return (
        <View className="homeBtn" onClick={() => navigateTo()} style={{ 'top': H() + 6 + "PX" }}>
            {prop.type === "home" && (
                <Image
                    src={require("../static/icon/homeBtn.png").default}
                    className="homeBtnImg"                    
                ></Image>
            )}
            {prop.type === "back" && (
                <Image
                    src={require("../static/icon/backBtn.png").default}
                    className="backBtnImg"
                ></Image>
            )}
        </View>
    );
};

export default HomeBtn;
