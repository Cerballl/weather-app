'use client'

import '@/styles/weather_style.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Типізація для даних погоди
interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  city: string;
  icon: string;
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const search = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;

      const allIcons: { [key: string]: string } = {
        "01d": "/clear_day.svg",
        "02d": "/few_clouds_day.svg",
        "03d": "/scattered_clouds_day.svg",
        "04d": "/broken_clouds_day.svg",
        "09d": "/shower_rain.svg",
        "10d": "/rain_day.svg",
        "11d": "/thunderstorm.svg",
        "13d": "/snow_day.svg",
        "50d": "/mist.svg",
        "01n": "/clear_night.svg",
        "02n": "/few_clouds_night.svg",
        "03n": "/scattered_clouds_night.svg",
        "04n": "/broken_clouds_night.svg",
        "09n": "/shower_rain_night.svg",
        "10n": "/rain_night.svg",
        "11n": "/thunderstorm_night.svg",
        "13n": "/snow_night.svg",
        "50n": "/mist.svg",
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon];

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    search('');
  }, [])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <Image onClick={()=>search(inputRef.current?.value || "")}
          src="/search.svg" alt="search" width={50} height={50} className='search-bar-img' />
      </div>

      {weatherData && (
        <>
          <Image className='weather-icon' src={weatherData.icon} alt="weather_icon" width={175} height={175} />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='city'>{weatherData.city}</p>
          <div className="weather-data">
            <div className="col">
              <Image src="/mist.svg" alt="humidity-icon" width={26} height={26} className='weather-data-img' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <Image src="/wind.svg" alt="wind-icon" width={26} height={26} className='weather-data-img' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
