import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { GET_ADCODE_API } from "../constants/api";
import { useLocationStore, LocationStore } from "src/store/common";
import { isEqual } from "lodash";

interface TaroLoLcation {
  latitude?: number;
  longitude?: number;
}

const useLocation = () => {
  const [taroLocation, setTaroLocation] = useState({} as TaroLoLcation);
  const location = useLocationStore((state: LocationStore) => state.location);
  const setLocation = useLocationStore(
    (state: LocationStore) => state.setLocation
  );
  const option = {
    isHighAccuracy: true,
    needFullAccuracy: true,
  };

  useEffect(() => {
    Taro.getLocation(option).then(async (res) => {
      const { latitude, longitude } = res;
      setTaroLocation({
        latitude,
        longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (Reflect.ownKeys(taroLocation).length === 0) return;
    Taro.getLocation(option).then(async (res) => {
      const { latitude, longitude } = res;
      const data = await Taro.request({
        url: GET_ADCODE_API,
        data: {
          location: `${longitude},${latitude}`,
        },
      });
      const city = data.data.regeocode?.addressComponent?.adcode;
      const newLocation = {
        latitude,
        longitude,
        adcode: city,
        city,
      };
      if (!isEqual(location, newLocation)) {
        setLocation(newLocation);
      }
    });
  }, [JSON.stringify(taroLocation)]);

  return {
    location,
  };
};

export default useLocation;
