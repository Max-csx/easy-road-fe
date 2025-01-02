import React, {
  useMemo,
  useState,
  memo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { CalendarCard, type CalendarCardDay } from "@nutui/nutui-react-taro";
import dayjs from "dayjs";
import useRequest from "ahooks/lib/useRequest";
import Taro from "@tarojs/taro";
import "./index.scss";

interface Holiday {
  date: string;
  holiday: boolean;
  name: string;
  waga: number;
  rest?: number;
  target?: string;
}
const date = new Date();

const CalendarCardComp = forwardRef<any, any>((props,ref) => {
  const [year, setYear] = useState(null);

  const renderDayTop = (day: CalendarCardDay) => {
    const { year, month, date } = day;
    if (dayjs().isSame(dayjs(`${year}-${month}-${date}`), "day")) {
      return "今日";
    }
  };

  const { data, loading } = useRequest(
    async () => {
      const data = await Taro.request({
        url: `https://timor.tech/api/holiday/year/${year}`,
      });
      return Object.values(data.data.holiday) as Holiday[];
    },
    { ready: Boolean(year), refreshDeps: [year] }
  ) as { data: Holiday[] | undefined; loading: boolean };

  const hoildayList = useMemo(() => {
    const map = new Map();
    data?.forEach((item) => {
      map.set(item.date, item);
    });
    return map;
  }, [data]);

  const renderDayBottom = (day: CalendarCardDay) => {
    const { year, month, date } = day;
    const today = dayjs(`${year}-${month}-${date}`).format("YYYY-MM-DD");
    return hoildayList.get(today)?.name;
  };

  const onPageChange = (page) => {
    page && setYear(page?.year);
  };


  useImperativeHandle(ref, ()=> ({
    getHoliday: ()  => data as Holiday[],
  }));
  return (
    <CalendarCard
      className="calendar-card-wrapper"
      defaultValue={date}
      renderDayTop={renderDayTop}
      renderDayBottom={renderDayBottom}
      onPageChange={onPageChange}
      {...props}
    />
  );
});
export default memo(CalendarCardComp);
