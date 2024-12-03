export default defineAppConfig({
  pages: ["pages/index/index", "pages/menu/index", "pages/map/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999",
    selectedColor: "#333",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },

      {
        pagePath: "pages/map/index",
        text: "家庭",
      },
      {
        pagePath: "pages/menu/index",
        text: "更多",
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示",
    },
  },
  requiredPrivateInfos: ["getLocation"],
});
