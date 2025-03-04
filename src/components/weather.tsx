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
        "02d": "/cloud.png",
        "03d": "/cloud.png",
        "04d": "/cloud.png",
        "09d": "/rain.png",
        "10d": "/drizzle.png",
        "11d": "/rain.png",
        "13d": "/snow.png",
        "50d": "/humidity.png",
        "01n": "/clear.png",
        "02n": "/cloud.png",
        "03n": "/cloud.png",
        "04n": "/cloud.png",
        "09n": "/rain.png",
        "10n": "/drizzle.png",
        "11n": "/rain.png",
        "13n": "/snow.png",
        "50n": "/humidity.png",
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Отримуємо іконку згідно з погодними умовами
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
    search('Polatsk');
  }, [])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <Image onClick={()=>search(inputRef.current.value)}
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
