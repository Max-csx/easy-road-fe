import { View, Map, MapProps } from "@tarojs/components";
import "./index.scss";
const defalutConfig = {
  showLocation: true,
  showCompass: true,
  enableZoom: true,
  enableScroll: true,
  enablePoi: true,
  style: { width: "100vw", height: "100vh" },
};
export default (props: MapProps) => {
  return (
    <View className="map-wrap">
      <Map {...defalutConfig} {...props} />
    </View>
  );
};
