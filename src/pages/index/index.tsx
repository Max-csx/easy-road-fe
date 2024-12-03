import React, { useMemo, useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { WEATHER_API, GET_ADCODE_API } from "../../constants/api";
import useRequest from "ahooks/lib/useRequest";
import type { liveWeatherItemType } from "src/components/weather";
import Weather from "src/components/weather";
import { Skeleton } from "@nutui/nutui-react-taro";
import Map from "src/components/map";

function Index() {
  const option = {
    isHighAccuracy: true,
    needFullAccuracy: true,
  };

  const [mapInfo, setMapInfo] = useState({});

  const { data: liveWeather, loading } = useRequest(() => {
    return Taro.getLocation(option).then(async (res) => {
      const { latitude, longitude } = res;
      console.log(latitude, longitude);
      setMapInfo({
        ...mapInfo,
        latitude,
        longitude,
      });
      const data = await Taro.request({
        url: GET_ADCODE_API,
        data: {
          location: `${longitude},${latitude}`,
        },
      });
      const city = data.data.regeocode?.addressComponent?.adcode;
      const weatherData = await Taro.request({
        url: WEATHER_API,
        data: {
          city,
          extensions: "base",
        },
      });

      return weatherData.data?.lives as liveWeatherItemType[];
    });
  }, {});

  const weatherInfo = useMemo(() => {
    const localInfo = liveWeather?.[0];
    const city = localInfo?.city;
    const province = localInfo?.province;

    return {
      area: province ? `${province} ${city}` : "",
      ...localInfo,
    };
  }, [liveWeather]);

  console.log(weatherInfo);

  return (
    <Skeleton visible={!loading} rows={3} title animated>
      <Weather liveWeather={weatherInfo} loading={loading} />
      <Map {...mapInfo} />
    </Skeleton>
  );
}

export default Index;
