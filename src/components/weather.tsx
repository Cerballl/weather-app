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
        "01d": "/clear.png",
        "02d": "/partly_cloudy.png",
        "03d": "/cloudy.png",
        "04d": "/cloudy.png",
        "09d": "/shower_rain.png",
        "10d": "/rain.png",
        "11d": "/storm.png",
        "13d": "/snow.png",
        "50d": "/mist.png",
        "01n": "/clear_night.png",
        "02n": "/cloudy_night.png",
        "03n": "/cloudy_night.png",
        "04n": "/cloudy_night.png",
        "09n": "/rain_night.png",
        "10n": "/rain_night.png",
        "11n": "/storm_night.png",
        "13n": "/snow_night.png",
        "50n": "/mist.png",
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

      {/* Виводимо іконку погоди, якщо дані завантажено */}
      {weatherData && (
        <>
          <Image className='weather-icon' src={weatherData.icon} alt="weather_icon" width={175} height={175} />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='city'>{weatherData.city}</p>
          <div className="weather-data">
            <div className="col">
              <Image src="/humidity.png" alt="humidity-icon" width={26} height={26} className='weather-data-img' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <Image src="/wind.png" alt="wind-icon" width={26} height={26} className='weather-data-img' />
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
