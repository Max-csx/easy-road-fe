import React, { useMemo } from "react";
import "./index.scss";
import useRequest from "ahooks/lib/useRequest";
import Weather from "src/components/weather";
import { Skeleton } from "@nutui/nutui-react-taro";
import useLocation from "src/hooks/useLocation";
import CalendarCardComp from "src/components/calendarCard";
import { getWeather } from "../../service/api";
import { View } from "@tarojs/components";
function Index() {
  const { location } = useLocation();

  const { data, loading } = useRequest(
    async () => {
      const { adcode } = location;

      const PromiseList = [
        getWeather({ city: adcode, extensions: "base" }),
        getWeather({ city: adcode, extensions: "all" }),
      ];
      const weatherData = await Promise.all(PromiseList);
      const lives = weatherData[0].data.lives;
      const forecasts = weatherData[1].data.forecasts;
      return {
        lives,
        forecasts,
      };
    },
    {
      refreshDeps: [location.adcode],
      ready: Boolean(location.adcode),
    }
  );

  const weatherInfo = useMemo(() => {
    const { lives, forecasts } = data || {};
    const localInfo = lives?.[0];
    const city = localInfo?.city;
    const province = localInfo?.province;

    return {
      area: province ? `${province} ${city}` : "",
      ...localInfo,
      forecasts: forecasts?.[0].casts,
    };
  }, [data]);

  return (
    <View>
      <Weather
        weatherInfo={weatherInfo}
        loading={loading}
        autoPlay={true}
        controls={true}
      />
      <CalendarCardComp />
    </View>
  );
}

export default Index;
