"use client";

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


import { useState } from "react";

import "./Weather.module.css";


// {
//     "latitude": 42.973026,
//     "longitude": -81.24942,
//     "generationtime_ms": 0.24652481079101562,
//     "utc_offset_seconds": 0,
//     "timezone": "GMT",
//     "timezone_abbreviation": "GMT",
//     "elevation": 249,
//     "current_units": {
//         "time": "iso8601",
//         "interval": "seconds",
//         "is_day": "",
//         "rain": "mm",
//         "showers": "mm",
//         "weather_code": "wmo code",
//         "apparent_temperature": "°C",
//         "temperature_2m": "°C",
//         "precipitation": "mm",
//         "snowfall": "cm",
//         "relative_humidity_2m": "%"
//     },
//     "current": {
//         "time": "2025-10-23T14:45",
//         "interval": 900,
//         "is_day": 1,
//         "rain": 0,
//         "showers": 0,
//         "weather_code": 3,
//         "apparent_temperature": 5.1,
//         "temperature_2m": 8.7,
//         "precipitation": 0,
//         "snowfall": 0,
//         "relative_humidity_2m": 80
//     },
//     "hourly_units": {
//         "time": "iso8601",
//         "temperature_2m": "°C"
//     },
//     "hourly": {
//         "time": [

//         ]
//     }
// }



import { useDrawingArea } from '@mui/x-charts/hooks';
import { axisClasses, ChartsLegend, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';

  const Colorswitch = () => {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    return (
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2={`${svgHeight}px`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2F4CDD" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2F4CDD" stopOpacity="0" />
        </linearGradient>
      </defs>
    );
  };
  
const options = [5, 10, 20, 30];


// import { fetchWeatherApi } from 'openmeteo';


const url = "https://api.open-meteo.com/v1/forecast";
// const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models



export const Weather = (props: any) => {
  // const dispatch = useAppDispatch();
  const [numberOfQuotes, setNumberOfQuotes] = useState(10);

  // }, [location]);

  // const {data, isError, isLoading, isSuccess } = 
  
  // const { data: weatherData, isError: weatherError, isLoading: weatherLoading, isSuccess: weatherSuccess } = useFetchForecastWeatherQuery(params);

  // console.log('Weather Data:', weatherForecast);


  // if (isError) {
  //   return (
  //     <div>
  //       <h1>There was an error!!!</h1>
  //     </div>
  //   );
  // }

  if (!props.weatherForecast) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // if (isSuccess) {
    // return (
    //   <div className={styles.container}>
    //     <h3>Select the Quantity of Quotes to Fetch:</h3>
        {/* <select
          className={styles.select}
          value={numberOfQuotes}
          onChange={(e) => {
            setNumberOfQuotes(Number(e.target.value));
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
        {/* {data.quotes.map(({ author, quote, id }) => (
          <blockquote key={id}>
            &ldquo;{quote}&rdquo;
            <footer>
              <cite>{author}</cite>
            </footer>
          </blockquote>
        ))} */}
    //   </div>
    // );


    const { hourly: { temperature_2m, time } = {} } = props.weatherForecast as any;

    if (!(temperature_2m && time)) {
        // if (isLoading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
        // }
    }


    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

      return (
        <LineChart
          sx={{
            '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
              fontFamily: 'Roboto',
              fill: '#fff',
              fontSize: '16px !important',
              // strokeWidth: '0.5',
            },
            '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
              // stroke: '#0000FF',
              // strokeWidth: 0.4,
            },
            '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
              fill: '#fff',
            },
            '& .MuiChartsAxis-bottom .MuiChartsAxis-label tspan': {
              fontSize: '20px !important',
            },
            '& .MuiChartsAxis-left .MuiChartsAxis-label tspan': {
              fontSize: '20px !important',
            }
          }}
          xAxis={[{ scaleType: 'point', data: time.map((date: any, index: any) => date.substr(5)), tickInterval: (value, index) => index % 25 == 0 }]}
          series={[
            {
              data: temperature_2m,
              area: true,
              color: 'url(#areaGradient)', // Reference the gradient ID
              showMark: false,
            },
          ]}
          height={500}
        >
          <ChartsXAxis
            label="Time"
            labelStyle={{ fill: '#a6a1fdff' }}
             // Customize X-axis label color
          />
          <ChartsYAxis
            label="Temperature (°C)"
            labelStyle={{ fill: '#a6a1fdff' }} // Customize Y-axis label color
          />
          <ChartsLegend
            classes={{ label: 'chart-labels' }} // Customize legend label color
          />
          <Colorswitch /> {/* Render the component that defines the gradient */}
        </LineChart>
      );
  // }

  return null;
};


// const response = responses[0];

// // Attributes for timezone and location
// const latitude = response.latitude();
// const longitude = response.longitude();
// const elevation = response.elevation();
// const utcOffsetSeconds = response.utcOffsetSeconds();

// console.log(
// 	`\nCoordinates: ${latitude}°N ${longitude}°E`,
// 	`\nElevation: ${elevation}m asl`,
// 	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
// );

// const hourly = response.hourly()!;

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
// 	hourly: {
// 		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
// 			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		temperature_2m: hourly.variables(0)!.valuesArray(),
// 		relative_humidity_2m: hourly.variables(1)!.valuesArray(),
// 		rain: hourly.variables(2)!.valuesArray(),
// 		wind_speed_10m: hourly.variables(3)!.valuesArray(),
// 	},
// };