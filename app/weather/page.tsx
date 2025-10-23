"use client";

import * as React from 'react';
import Image from "next/image";
import { Weather as WeatherChart } from "../components/weather/Weather";
import styles from "../styles/layout.module.css";
import { selectLocation, selectWeatherData, setWeatherData } from "@/lib/features/geo-coding/geoCodingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetQuotesQuery } from "@/lib/features/quotes/quotesApiSlice";

import { useFetchForecastWeatherQuery, weatherApiSlice } from "@/lib/features/weather/weatherApiSlice";

export default function WeatherPage() {
  
  const location: any = useAppSelector(selectLocation);
  const { current: { is_day = 1, time } = {} } = useAppSelector(selectWeatherData);
  const timeString = new Date(time).toLocaleTimeString();
  const dispatch = useAppDispatch();
  // Using a query hook automatically fetches data and returns query 
  const params = {
    "latitude": 52.52,
    "longitude": 13.41,
    "hourly": ["temperature_2m", "relative_humidity_2m", "rain", "wind_speed_10m"],
  };
  params.latitude = location?.latitude;
  params.longitude = location?.longitude;

  console.log('Fetching weather with params:', params);

  const { data, isError, isLoading, isSuccess } = useFetchForecastWeatherQuery(params);

  if (data) {
    dispatch(setWeatherData(data));
  }

  
  // React.useEffect(() => {

    // React.useEffect(() => {
    //   // handleClearCache
    //   // dispatch(weatherApiSlice.util.resetApiState());
    // }, [params.latitude, params.longitude]);

    // if (isSuccess) {
    //   setWeatherForecast(data);
    // }

  return (
    <div className="weather-container">
      {/* <h1>Quotes page</h1>
      <p>This page is intended to showcase RTK Query.</p> */}
      <div className="flex gap-4">
        <div className="flex w-128">
          <Image
            src={is_day ? "/weather-sun.svg" : "/weather-moon.png"}
            className={styles.clouds}
            alt="logo"
            width={100}
            height={100}
          />
          <div className='align-center'>
            <h2 className="weather-tiles">&nbsp; {timeString}</h2>
            <h2 className="weather-tiles">&nbsp; {location.city}, {location.country}</h2>
          </div>
        </div>
        <div className="flex w-128">
          <Image
            src="/cloud-shower.png"
            className={styles.clouds}
            alt="logo"
            width={100}
            height={100}
          />
          <h4 className="weather-tiles">Rain</h4>
        </div>
        <div className="flex w-128">
          <Image
            src="/humidity.png"
            className={styles.humidity}
            alt="logo"
            width={100}
            height={100}
          />
          <h4 className="weather-tiles">Humid</h4>
        </div>
      </div>
      <WeatherChart weatherForecast={data}/>
    </div>
  );
}
