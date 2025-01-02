import { View, Text } from "@tarojs/components";
import { IconFont, AngleDoubleDown } from "@nutui/icons-react-taro";
import "./index.scss";
import { WEATHER_MAP, WEEK_DAY_MAP } from "./constants";
import IconFontComp from "../IconFont";
import isNil from "lodash/isNil";
import { Popup } from "@nutui/nutui-react-taro";
import { useBoolean } from "ahooks";
import dayjs from "dayjs";

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

export type weatherInfoType = liveWeatherItemType & {
  forecasts: forecastWeatherItemType[];
};
const Weather = (props: {
  weatherInfo: weatherInfoType;
  loading?: boolean;
}) => {
  const { weatherInfo } = props;
  const [showPopup, { toggle }] = useBoolean(false);
  const weatherIconName = weatherInfo?.weather
    ? WEATHER_MAP[weatherInfo?.weather]
    : null;

  return (
    <View className="weather-info">
      <View className="location-and-waeatherIcon">
        <View className="location">
          <Text className="location-text"> {weatherInfo?.area}</Text>
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
          <Text className="weather-text">{weatherInfo?.weather}</Text>
        </View>
      </View>

      <View className="weather-temperature">
        <View>
          {isNil(weatherInfo?.temperature) ? null : (
            <Text>
              <Text className="weather-temperature-num">
                {weatherInfo?.temperature || ""}
              </Text>
              <Text className="weather-temperature-unit">°C</Text>
            </Text>
          )}
        </View>
        <View className="wind-and-showforecasts-wrap">
          <Text>{weatherInfo?.winddirection}</Text>
          <Text>{weatherInfo?.windpower}</Text>
          <AngleDoubleDown onClick={toggle} />
        </View>
      </View>
      <Popup visible={showPopup} onClose={toggle} position="top">
        <View className="forecasts-weather-wrap">
          <Text className="forecasts-title">天气预报</Text>
          <View className="forecasts-weather">
            {weatherInfo?.forecasts?.map((item) => {
              return (
                <View
                  className={`forecasts-item ${
                    dayjs().isSame(dayjs(item.date), "day")
                      ? "forecasts-item-today"
                      : ""
                  }`}
                  key={`${item.week}`}
                >
                  <View className="forecasts-item-text">
                    {isNil(item.week) ? null : WEEK_DAY_MAP[item.week]}
                  </View>
                  <View className="forecasts-item-text">
                    {isNil(item.date) ? null : item.date}
                  </View>
                  <View className="forecasts-item-text">
                    {isNil(item.daytemp)
                      ? null
                      : `${item.nighttemp}°C-${item.daytemp}°C`}
                  </View>
                  <View className="forecasts-item-text">
                    {item.nightweather === item.dayweather
                      ? item.nightweather
                      : `${item.dayweather}转${item.nightweather}`}
                  </View>
                  <View className="forecasts-item-text">
                    {item.daywind === item.nightwind
                      ? `${item.nightwind}风`
                      : `${item.daywind}风转${item.nightwind}风`}
                    {item.daypower === item.nightpower
                      ? `${item.nightpower}级`
                      : `${item.daypower}级转${item.nightpower}级`}
                  </View>
                  <View className="forecasts-item-text">
                    {item.nightweather === item.dayweather
                      ? item.nightweather
                      : `${item.dayweather}转${item.nightweather}`}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Popup>
    </View>
  );
};

export default Weather;
