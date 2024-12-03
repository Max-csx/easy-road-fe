import { View, Text } from "@tarojs/components";
import { IconFont } from "@nutui/icons-react-taro";
import "./index.scss";
import { WEATHER_MAP } from "./constants";

export type forecastWeatherItemType = {
  date?: string;
  week?: string;
  dayweather?: string;
  nightweather?: string;
  daytemp?: string;
  nighttemp?: string;
  daywind?: string;
  nightwind?: string;
  daypower?: string;
  nightpower?: string;
};

export type liveWeatherItemType = {
  province?: string;
  city?: string;
  adcode?: string;
  weather?: string;
  temperature?: string;
  winddirection?: string;
  windpower?: string;
  humidity?: string;
  reporttime?: string;
  area?: string;
};

export type weatherInfoType = {
  area?: string;
  city?: string;
  province?: string;
  reporttime?: string;
  temperature?: string;
  liveWeather?: liveWeatherItemType;
  forecastWeather?: Array<forecastWeatherItemType>;
  loading?: boolean;
};

const Weather = (props: weatherInfoType) => {
  const { liveWeather } = props;
  const weatherIconName = liveWeather?.weather
    ? WEATHER_MAP[liveWeather?.weather]
    : null;

  return (
    <View className="weather-info">
      <Text>{liveWeather?.area}</Text>

      {weatherIconName ? (
        <IconFont
          fontClassName="iconfont"
          classPrefix="icon"
          name={weatherIconName}
          color="#cff6ff"
        />
      ) : null}
      <Text className="city">{liveWeather?.weather}</Text>
      <Text className="city">
        {liveWeather?.temperature ? `${liveWeather?.temperature}℃` : null}
      </Text>

      <View className="current-weather"></View>
    </View>
  );
};

export default Weather;
