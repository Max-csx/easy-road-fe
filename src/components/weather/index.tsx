import { View, Text } from "@tarojs/components";
import { IconFont } from "@nutui/icons-react-taro";
import "./index.scss";
import { WEATHER_MAP } from "./constants";
import IconFontComp from "../IconFont";
import isNil from "lodash/isNil";
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
      <View className="location-and-waeatherIcon">
        <View className="location">
          <Text className="location-text"> {liveWeather?.area}</Text>
          <IconFontComp name="dingwei" size="14" />
        </View>
        <View className="weather-icon-text">
          {weatherIconName ? (
            <IconFont
              fontClassName="iconfont"
              classPrefix="icon"
              name={weatherIconName}
              color="#999"
            />
          ) : null}
          <Text className="weather-text">{liveWeather?.weather}</Text>
        </View>
      </View>

      <View className="weather-temperature">
        <View>
          {isNil(liveWeather?.temperature) ? null : (
            <Text>
              <Text className="weather-temperature-num">
                {liveWeather?.temperature || ""}
              </Text>
              <Text className="weather-temperature-unit">°C</Text>
            </Text>
          )}
        </View>
        <View>
          <Text>{liveWeather?.winddirection}</Text>
          <Text>{liveWeather?.windpower}</Text>
        </View>{" "}
      </View>

      <View className="current-weather"></View>
    </View>
  );
};

export default Weather;
