export default {
    pages: [
        "pages/login/login",
        "pages/index/index",
        "pages/me/me",
        "pages/feedback/feedback",
        "pages/dotests/dotests",
        "pages/result/result",
    ],
    tabBar: {
        backgroundColor: "white",
        color: "#a4a4a4",
        selectedColor: "#303030",
        list: [
            {
                pagePath: "pages/index/index",
                text: "首页",
                iconPath: "./static/icon/icon-attabbar1.png",
                selectedIconPath: "./static/icon/icon-attabbar1-active.png",
            },
            {
                pagePath: "pages/me/me",
                text: "我的",
                iconPath: "./static/icon/icon-attabbar2.png",
                selectedIconPath: "./static/icon/icon-attabbar2-active.png",
            },
        ],
    },
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black",
    },
};
