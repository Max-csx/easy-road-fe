import React, { useMemo, useRef, useState, useEffect } from "react";
import "./index.scss";
import useRequest from "ahooks/lib/useRequest";
import Weather from "src/components/weather";
import useLocation from "src/hooks/useLocation";
import CalendarCardComp from "src/components/CalendarCard";
import { getWeather } from "../../service/api";
import { View } from "@tarojs/components";
import { NoticeBar } from "@nutui/nutui-react-taro";
import dayjs from "dayjs";

interface Holiday {
  date?: string;
  holiday?: boolean;
  name?: string;
  waga?: number;
  rest?: number;
  target?: string;
  notice?: string;
}

function Index() {
  const { location } = useLocation();
  const holidayRef = useRef(null);

  const [noticeInfo, setNoticeInfo] = useState({}as Holiday) ;
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

  useEffect(() => {
    if (holidayRef?.current?.getHoliday) {
      const currentYearHoliday = holidayRef?.current
        ?.getHoliday()
        ?.filter((i) => i?.holiday);
      const afterFirstHoliday = currentYearHoliday?.find((i) =>
        dayjs(i?.date).isAfter(dayjs().startOf("day"))
      );
      setNoticeInfo({
        ...afterFirstHoliday,
        notice: `距离${afterFirstHoliday?.date}${afterFirstHoliday?.name}还有${afterFirstHoliday?.rest}天`,
      });
    }
  }, [holidayRef?.current?.getHoliday]);

  return (
    <View>
      {noticeInfo?.date ? (
        <NoticeBar
          content={noticeInfo?.notice}
        />
      ) : null}
      <Weather weatherInfo={weatherInfo} loading={loading} />
      <CalendarCardComp ref={holidayRef} />
    </View>
  );
}

export default Index;
