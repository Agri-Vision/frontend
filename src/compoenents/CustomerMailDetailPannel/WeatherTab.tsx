import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, Box, CircularProgress } from '@mui/material';
import '../../assets/styles/weatherTab.css'; // Ensure you have the new CSS class added
import { useParams } from 'react-router-dom';

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
  const { id } = useParams<{ id: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [centerLat, setCenterLat] = useState<number | null>(null);
  const [centerLon, setCenterLon] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  useEffect(() => {
    // Fetch project data to get latitude and longitude
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project/${id}`);
        const data = await response.json();
        
        // Extract upper and lower latitude/longitude values
        const upperLat = parseFloat(data?.taskList?.[0]?.upperLat);
        const lowerLat = parseFloat(data?.taskList?.[0]?.lowerLat);
        const upperLng = parseFloat(data?.taskList?.[0]?.upperLng);
        const lowerLng = parseFloat(data?.taskList?.[0]?.lowerLng);

        if (upperLat && lowerLat && upperLng && lowerLng) {
          // Calculate center latitude and longitude
          const calculatedLat = (upperLat + lowerLat) / 2;
          const calculatedLon = (upperLng + lowerLng) / 2;

          setCenterLat(calculatedLat);
          setCenterLon(calculatedLon);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [API_BASE_URL, id]);

  useEffect(() => {
    // Fetch weather data if centerLat and centerLon are available
    if (centerLat !== null && centerLon !== null) {
      const fetchWeatherData = async () => {
        try {
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${centerLat}&lon=${centerLon}&appid=${apiKey}&units=metric`;
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
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [centerLat, centerLon, apiKey]);

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
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default WeatherTab;
