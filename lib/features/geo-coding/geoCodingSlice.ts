import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchWeather } from "../weather/weatherApiSlice";
import { useAppDispatch } from "@/lib/hooks";
import { WeatherApiResponse } from "./geocodingApiSlice";
// import { fetchCount } from "./counterAPI";

interface Coordinates {
  latitude: number;
  longitude: number;
  hourly?: any;
}

export interface Location extends Coordinates {
  city?: string;
  country?: string;
}

export interface GeoCodingSliceState {
  location?: Location;
  weatherData: WeatherApiResponse | any;
}

const initialState: GeoCodingSliceState = {
  location: { latitude: 52.52, longitude: 13.41, hourly: ["temperature_2m", "relative_humidity_2m", "rain", "wind_speed_10m"], city: 'London', country: 'United Kingdom' },
  weatherData: {},
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const geoCodingSlice = createAppSlice({
  name: "geocoding",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // increment: create.reducer((state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // }),
    // decrement: create.reducer((state) => {
    //   state.value -= 1;
    // }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setGeoLocation: create.reducer(
      (state, action: PayloadAction<Location>) => {
        state.location = action.payload;
      },
    ),
    setWeatherData: create.reducer(
      (state, action: PayloadAction<WeatherApiResponse>) => {
        state.weatherData = action.payload;
      },
    ),
    // fetchGeoLocation: create.asyncThunk(
    //   async (coords: Coordinates) => {
    //     // const response = await fetchCount(amount); // Replace with actual API call
    //     // The value we return becomes the `fulfilled` action 
    //     console.log('Fetching weather for coords:', coords);
    //     const response = await fetchWeather(coords);
    //     return response;
    //   },
    //   {
    //     pending: (state) => {
    //       // state.status = "loading";
    //       console.log(state);
    //     },
    //     fulfilled: (state, action) => {
    //       state.weatherData = action.payload;
    //       console.log(state)
    //       // state.status = "idle";
    //       // state.value += action.payload;
    //     },
    //     rejected: (state) => {
    //       console.log(state);
    //       // state.status = "failed";
    //     },
    //   },
    // ),
    
    
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount);
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.value += action.payload;
    //     },
    //     rejected: (state) => {
    //       state.status = "failed";
    //     },
    //   },
    // ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectLocation: (counter) => counter.location,
    selectWeatherData: (counter) => counter.weatherData,
  },
});

// Action creators are generated for each case reducer function.
export const { setGeoLocation, setWeatherData } =
  geoCodingSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectLocation, selectWeatherData } = geoCodingSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
