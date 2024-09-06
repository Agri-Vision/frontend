import React, { useEffect, useState } from 'react';
import '../../assets/styles/weatherTab.css';

interface WeatherData {
  date: string;
  temperature: number;
  dayDescription: string;
  nightDescription: string;
  dayIcon: string;
  nightIcon: string;
  precipitationTypeDay: string | null;
  precipitationTypeNight: string | null;
  precipitationIntensityDay: string | null;
  precipitationIntensityNight: string | null;
}

const WeatherTab: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const apiKey = 'bJKrlz1Lp1AL0M209e8KzUvLwgOLKuje';
  const locationKey = '307315';
  const apiUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const transformedData = data.DailyForecasts.map((forecast: any) => ({
          date: new Date(forecast.Date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          temperature: ((forecast.Temperature.Maximum.Value - 32) * 5) / 9, // Convert to Celsius
          dayDescription: forecast.Day.IconPhrase,
          nightDescription: forecast.Night.IconPhrase,
          dayIcon: `https://developer.accuweather.com/sites/default/files/${String(forecast.Day.Icon).padStart(2, '0')}-s.png`,
          nightIcon: `https://developer.accuweather.com/sites/default/files/${String(forecast.Night.Icon).padStart(2, '0')}-s.png`,
          precipitationTypeDay: forecast.Day.PrecipitationType || null,
          precipitationTypeNight: forecast.Night.PrecipitationType || null,
          precipitationIntensityDay: forecast.Day.PrecipitationIntensity || null,
          precipitationIntensityNight: forecast.Night.PrecipitationIntensity || null,
        }));

        setWeatherData(transformedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiUrl]);

  return (
    <div className="weather-tab-container">
      <h4>WEATHER INFORMATION</h4>
      <div className="weather-info-list">
        {weatherData.map((weather, index) => (
          <div key={index} className="weather-info-card">
            <div className="weather-details">
              <p><strong>{weather.date}</strong></p>
              <p>Temperature: <strong>{weather.temperature.toFixed(2)} °C</strong></p>
              <p>Day: {weather.dayDescription}</p>
              {weather.precipitationTypeDay && (
                <p>Precipitation: {weather.precipitationTypeDay}, {weather.precipitationIntensityDay}</p>
              )}
            </div>
            <div className="weather-icon">
              <img src={weather.dayIcon} alt="Day Weather icon" />
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default WeatherTab;





// old code------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { Box, Button, Grid, Paper, Typography } from '@mui/material';
// import '../../assets/styles/weatherTab.css';


// interface WeatherData {
//   date: string;
//   location: string;
//   temperature: number;
//   humidity: number;
//   icon: string;
// }

// const WeatherTab: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

//   useEffect(() => {
//     // Dummy data to simulate an API response
//     const dummyData: WeatherData[] = [
//       {
//         date: "Mon, Jul 22",
//         location: "Kotte",
//         temperature: 31.71,
//         humidity: 85,
//         icon: "../../assets/img/01-s.png" 
//       },
//       {
//         date: "Tue, Jul 23",
//         location: "Colombo",
//         temperature: 29.5,
//         humidity: 80,
//         icon: "../../assets/img/07-s.png"
//       },
//       {
//         date: "Wed, Jul 24",
//         location: "Galle",
//         temperature: 28.2,
//         humidity: 78,
//         icon: "../../assets/img/18-s.png"
//       }
//     ];

    
//     setWeatherData(dummyData);
//   }, []);

//   return (
//     <div className="weather-info-container">
//       <h4>WEATHER INFORMATION</h4>
//       <div className="weather-info-list">
//         {weatherData.map((weather, index) => (
//           <div key={index} className="weather-info-card">
//             <div className="weather-content">
//               <div className="weather-details">
//                 <p><strong>{weather.date}</strong></p>
//                 <p>{weather.location}</p>
//                 <p>Temperature: <strong>{weather.temperature} C</strong></p>
//                 <p>Humidity: {weather.humidity}%</p>
//               </div>
//               <div className="weather-icon">
//                 <img src={weather.icon} alt="Weather icon" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WeatherTab;
