import Taro from "@tarojs/taro";
/* 获取天气信息的API */
export const WEATHER_API = "http://192.168.110.143:3000/common/weather";

/*  获取行政区划代码的API */
export const GET_ADCODE_API = "http://192.168.110.143:3000/common/get_adcode";


export const getWeather = (params:Record<string, any>) => {
  return Taro.request({
    url: WEATHER_API,
    data: {
      ...params
    },
  });
};
