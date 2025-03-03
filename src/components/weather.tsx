import '@/styles/weather_style.css';
import Image from 'next/image';

export default function Weather() {
  return (
    <div className="weather">
        <div className="search-bar">
            <input type="text" placeholder="Search"/>
            <Image src="/search.svg" alt="search" width={50} height={50}
              className='search-bar-img'/>
        </div>
        <Image className='weather-icon' src="/clear.png" alt="wether_icon" width={175} height={175}/>
        <p className='temperature'>16°С</p>
        <p className='city'>Lviv</p>
        <div className="weather-data">
          <div className="col">
            <Image src="/humidity.png" alt="humidity-icon" width={26} height={26} className='weather-data-img'/>
            <div>
              <p>91 %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <Image src="/wind.png" alt="wind-icon" width={26} height={26} className='weather-data-img'/>
            <div>
              <p>5.4 km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  );
};
