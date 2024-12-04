import React, { useMemo } from "react";
import "./index.scss";
import Taro from "@tarojs/taro";
import { WEATHER_API } from "../../constants/api";
import useRequest from "ahooks/lib/useRequest";
import type { liveWeatherItemType } from "src/components/weather";
import Weather from "src/components/weather";
import { Skeleton } from "@nutui/nutui-react-taro";
import Map from "src/components/map";
import useLocation from "src/hooks/useLocation";
function Index() {
  const { location } = useLocation();

  const { data: liveWeather, loading } = useRequest(
    async () => {
      const { city } = location;
      const weatherData = await Taro.request({
        url: WEATHER_API,
        data: {
          city,
          extensions: "base",
        },
      });
      return weatherData.data?.lives as liveWeatherItemType[];
    },
    {
      refreshDeps: [location.adcode],
      ready: Boolean(location.adcode),
    }
  );

  const weatherInfo = useMemo(() => {
    const localInfo = liveWeather?.[0];
    const city = localInfo?.city;
    const province = localInfo?.province;

    return {
      area: province ? `${province} ${city}` : "",
      ...localInfo,
    };
  }, [liveWeather]);

  console.log(weatherInfo, "weatherInfo");

  return (
    <Skeleton visible={!loading} rows={3} title animated>
      <Weather liveWeather={weatherInfo} loading={loading} />
      <Map {...location} />
    </Skeleton>
  );
}

export default Index;
