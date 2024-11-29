import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import '../../assets/styles/weatherTab.css'; // Ensure you have the new CSS class added

interface WeatherData {
  date: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  windSpeed: number;
  humidity: number;
}

const WeatherTab: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const lat = '7.1947473';
  const lon = '80.5402994';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter data to get forecasts for 12:00 PM each day
        const filteredData = data.list.filter((forecast: any) =>
          new Date(forecast.dt_txt).getHours() === 12
        );

        const transformedData = filteredData.map((forecast: any) => ({
          date: new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          temperature: forecast.main.temp,
          feelsLike: forecast.main.feels_like,
          description: forecast.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`, // Using API icon
          windSpeed: forecast.wind.speed,
          humidity: forecast.main.humidity,
        }));

        setWeatherData(transformedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiUrl]);

  return (
    <Box className="weather-scroll-container"> {/* Use the CSS class for scroll container */}
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontFamily: 'Nunito, Poppins, sans-serif',
          textTransform: 'capitalize',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#5c8843'
        }}
      >
        WEATHER INFORMATION
      </Typography>
      <Grid container spacing={2} direction="column"> {/* Align in column */}
        {weatherData.map((weather, index) => (
          <Grid item key={index}>
            <Card
              sx={{
                borderRadius: '20px',
                padding: '0px',
                width: '280px',
                height: '160px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#FFFFFF',
                color: '#333',
              }}
            >
              <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '30px', lineHeight: '1', color: '#5D6965' }}>
                      {weather.temperature.toFixed(1)}°C
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px', color: '#666', marginBottom: '0px' }}>
                      Feels like: {weather.feelsLike.toFixed(1)}°C
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: '18px', color: '#666', fontWeight: 'bold' }}>  {/* Highlighted date */}
                      {weather.date}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} textAlign="right">
                    <img src={weather.icon} alt="Weather icon" style={{ width: '60px', height: '60px' }} />
                    <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', color: '#f39c12' }}> {/* Condition under icon */}
                      {weather.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '14px', color: '#333' }}>
                    {weather.humidity}% Humidity
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '14px', color: '#333' }}>
                    {weather.windSpeed} km/h Wind Speed
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeatherTab;



















// import React, { useEffect, useState } from 'react';
// import '../../assets/styles/weatherTab.css';
// import { Typography } from '@mui/material';

// interface WeatherData {
//   date: string;
//   temperature: number;
//   dayDescription: string;
//   nightDescription: string;
//   dayIcon: string;
//   nightIcon: string;
//   precipitationTypeDay: string | null;
//   precipitationTypeNight: string | null;
//   precipitationIntensityDay: string | null;
//   precipitationIntensityNight: string | null;
// }

// const WeatherTab: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
//   const apiKey = 'bJKrlz1Lp1AL0M209e8KzUvLwgOLKuje';
//   const locationKey = '307315';
//   const apiUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         const transformedData = data.DailyForecasts.map((forecast: any) => ({
//           date: new Date(forecast.Date).toLocaleDateString('en-US', {
//             weekday: 'short',
//             month: 'short',
//             day: 'numeric',
//           }),
//           temperature: ((forecast.Temperature.Maximum.Value - 32) * 5) / 9, // Convert to Celsius
//           dayDescription: forecast.Day.IconPhrase,
//           nightDescription: forecast.Night.IconPhrase,
//           dayIcon: `https://developer.accuweather.com/sites/default/files/${String(forecast.Day.Icon).padStart(2, '0')}-s.png`,
//           nightIcon: `https://developer.accuweather.com/sites/default/files/${String(forecast.Night.Icon).padStart(2, '0')}-s.png`,
//           precipitationTypeDay: forecast.Day.PrecipitationType || null,
//           precipitationTypeNight: forecast.Night.PrecipitationType || null,
//           precipitationIntensityDay: forecast.Day.PrecipitationIntensity || null,
//           precipitationIntensityNight: forecast.Night.PrecipitationIntensity || null,
//         }));

//         setWeatherData(transformedData);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     };

//     fetchWeatherData();
//   }, [apiUrl]);

//   return (
//     <div className="weather-tab-container">
//       <Typography
//                 variant="h6"
//                 align="center"
//                 gutterBottom
//                 sx={{
//                   fontFamily: 'Nunito, Poppins, sans-serif',
//                   textTransform: 'capitalize',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   color: '#5c8843'
//                 }}
//               >
//               WEATHER INFORMATION
//       </Typography>
      

//       <div className="weather-info-list">
//         {weatherData.map((weather, index) => (
//           <div key={index} className="weather-info-card">
//             <div className="weather-details">
//               <p><strong>{weather.date}</strong></p>
//               <p>Temperature: <strong>{weather.temperature.toFixed(2)} °C</strong></p>
//               <p>Day: {weather.dayDescription}</p>
//               {weather.precipitationTypeDay && (
//                 <p>Precipitation: {weather.precipitationTypeDay}, {weather.precipitationIntensityDay}</p>
//               )}
//             </div>
//             <div className="weather-icon">
//               <img src={weather.dayIcon} alt="Day Weather icon" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WeatherTab;
