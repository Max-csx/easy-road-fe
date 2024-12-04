import { create } from "zustand";
export interface LocationState {
  longitude: string | number;
  latitude: string | number;
  city: string;
  adcode: string;
  streetNumber?: StreetNumber;
}

export interface StreetNumber {
  street: string;
  number: string;
  location: string;
  direction: string;
  distance: string;
}

export interface LocationStore {
  location: LocationState;
  setLocation: (location: LocationState) => void;
}
export const useLocationStore = create(
  (set): LocationStore => ({
    location: {
      longitude: 0,
      latitude: 0,
      city: "",
      adcode: "",
    },
    setLocation: (location) => set(() => ({ location })),
  })
);
