import React, { useLayoutEffect, useMemo } from "react";
import "./index.scss";
import { Avatar, Popup, Button } from "@nutui/nutui-react-taro";
import { User } from "@nutui/icons-react-taro";
import { View } from "@tarojs/components";
import { useBoolean } from "ahooks";
import Taro from "@tarojs/taro";
import { UserInfoStore, useUserInfoStore } from "src/store/common";



const login = async () => {
  const userInfo = await Taro.getSetting("scope.userInfo");
  console.log("userInfo:", userInfo);

  const loginRes = await Taro.login();
  console.log("Login success, code:", loginRes.code);
};

function Index() {
  const userInfo = useUserInfoStore((state: UserInfoStore) => state.userInfo);
  const setUserInfo = useUserInfoStore((state: UserInfoStore) => state.setUserInfo);
  const [isLogin, { setTrue, setFalse }] = useBoolean(false);
  const [isShow, { toggle, setFalse: hidePopup }] = useBoolean(false);
  console.log("🚀 ~ Index ~ userInfo:", userInfo);

  const openPopup = () => {
    if (isLogin) return;
    toggle();
  };
  useLayoutEffect(() => {
    login();
  }, []);

  const onGetUserInfo = (res) => {
    console.log("onGetUserInfo:", res.detail);
    hidePopup();
    res?.detail?.signature && setTrue();
    setUserInfo(res.detail.userInfo);
  };

  const userName = useMemo(
    () => (isLogin ? userInfo?.nickName : "点击登录"),
    [isLogin, JSON.stringify(userInfo)]
  );
  return (
    <View>
      <View className="user-container">
        <View className="user-container-top">
          <View className="user-container-top-title">Easy Road</View>
          <View className="user-container-top-avattor">
            <Avatar
              src={userInfo?.avatarUrl}
              size="large"
              onClick={openPopup}
            />
            <View
              className="user-container-top-avattor-text"
              onClick={openPopup}
            >
              {userName}
            </View>
          </View>
        </View>
      </View>
      <Popup
        visible={isShow}
        style={{ padding: "8px" }}
        onClose={() => {
          hidePopup();
        }}
        className="user-container-popup"
      >
        <View className="user-container-popup-title">授权</View>
        <View className="user-container-popup-content
        ">
        <View className="user-container-popup-text">
          允许获取当前用户的头像昵称等信息
        </View>
        <View className="user-container-popup-btn">
          <Button onClick={hidePopup} size="small">
            取消
          </Button>
          <Button
            type="primary"
            openType="getUserInfo"
            size="small"
            onGetUserInfo={onGetUserInfo}
          >
            授权
          </Button>
        </View>
        </View>
      </Popup>
    </View>
  );
}

export default Index;
