import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import '../../assets/styles/weatherTab.css';


interface WeatherData {
  date: string;
  location: string;
  temperature: number;
  humidity: number;
  icon: string;
}

const WeatherTab: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    // Dummy data to simulate an API response
    const dummyData: WeatherData[] = [
      {
        date: "Mon, Jul 22",
        location: "Kotte",
        temperature: 31.71,
        humidity: 85,
        icon: "../../assets/img/01-s.png" 
      },
      {
        date: "Tue, Jul 23",
        location: "Colombo",
        temperature: 29.5,
        humidity: 80,
        icon: "../../assets/img/07-s.png"
      },
      {
        date: "Wed, Jul 24",
        location: "Galle",
        temperature: 28.2,
        humidity: 78,
        icon: "../../assets/img/18-s.png"
      }
    ];

    
    setWeatherData(dummyData);
  }, []);

  return (
    <div className="weather-info-container">
      <h4>WEATHER INFORMATION</h4>
      <div className="weather-info-list">
        {weatherData.map((weather, index) => (
          <div key={index} className="weather-info-card">
            <div className="weather-content">
              <div className="weather-details">
                <p><strong>{weather.date}</strong></p>
                <p>{weather.location}</p>
                <p>Temperature: <strong>{weather.temperature} C</strong></p>
                <p>Humidity: {weather.humidity}%</p>
              </div>
              <div className="weather-icon">
                <img src={weather.icon} alt="Weather icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherTab;
