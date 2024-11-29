import React, { useEffect, useState } from 'react';
import '../../assets/styles/leftColumnBtn.css';
import Button from '@mui/material/Button'; 
import { useButtonContext } from '../ButtonContext'; // Import the context

interface IoTData {
  temperature: string;
  humidity: string;
  uvLevel: string;
  soilMoisture: string;
  pressure: string;
  altitude: string;
}

const LeftColumnBtn: React.FC = () => {
  const [iotData, setIotData] = useState<IoTData | null>(null);

  // Importing from ButtonContext to toggle stress, yield, and disease
  const {isDiseaseActive, toggleDisease } = useButtonContext();

  // Updated API endpoint
  const API_BASE_URL = 'http://localhost:8080/iot/get_enviroment_data';

  // Function to fetch the latest IoT data
  const fetchIoTData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const data = await response.json();

      // Sort the data by the id in descending order
      if (data.length > 0) {
        const sortedData = data.sort((a: any, b: any) => b.id - a.id);
        const latestData = sortedData[0];

        setIotData({
          temperature: latestData.temperature,
          humidity: latestData.humidity,
          uvLevel: latestData.uvLevel,
          soilMoisture: latestData.soilMoisture,
          pressure: latestData.pressure,
          altitude: latestData.altitude,
        });
      }
    } catch (error) {
      console.error("Error fetching IoT data:", error);
    }
  };

  useEffect(() => {
    fetchIoTData();
  }, []);


  const handleToggleDisease = () => toggleDisease(); // Toggle disease state using context


  return (
    <div className="sidebar-container">
      <div className="buttons-container">
        {/* Yield Button */}
        <Button
          variant="contained"
          className="control-button"
          disabled={true}
          sx={{
            backgroundColor: '#5c8843', 
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: '#5c8843',
            },
          }}
          
        >
          Yield
        </Button>

        {/* Stress Button */}
        <Button
          variant="contained"
          className="control-button"
          disabled={true}
          sx={{
            backgroundColor: '#5c8843', 
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: '#5c8843', 
            },
          }}
          
        >
          Stress
        </Button>

         {/* Disease Button */}
         <Button
          variant="contained"
          className="control-button"
          sx={{
            backgroundColor: isDiseaseActive ? '#061a29' : '#5c8843', // Light brown for disease
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: isDiseaseActive ? '#061a29' : '#061a29', 
            },
          }}
          onClick={handleToggleDisease} // Use toggle from context
        >
          Disease
        </Button>

      </div>
      <div className="info-container">
        <div className="info-card highlight-temperature">
          <span className="info-value">{iotData?.temperature ? `${parseFloat(iotData.temperature).toFixed(1)}`: 'N/A'} &#8451; </span>
          <span className="info-label">Temperature</span>
        </div>
        <div className="info-card highlight-humidity">
          <span className="info-value">{iotData?.humidity ? `${parseFloat(iotData.humidity).toFixed(1)}`: 'N/A'} %</span>
          <span className="info-label">Humidity</span>
        </div>
        <div className="info-card highlight-soil">
  <span className="info-value-soil">
    {iotData?.soilMoisture
      ? `${((parseFloat(iotData.soilMoisture) - 205) * 100 / (580 - 205)).toFixed(1)}%`
      : 'N/A'}
  </span>
  <span className="info-label">Soil Moisture</span>
</div>

        <div className="info-card highlight-uv">
          <span className="info-value">{iotData?.uvLevel ?? 'N/A'}</span>
          <span className="info-label">UV</span>
        </div>
        <div className="info-card highlight-pressure">
          <span className="info-value-soil">{iotData?.pressure ? `${parseFloat(iotData.pressure).toFixed(1)}`: 'N/A'} Pa</span>
          <span className="info-label">Atmo.Pressure</span>
        </div>
        <div className="info-card highlight-altitude">
          <span className="info-value">{iotData?.altitude ? `${parseFloat(iotData.altitude).toFixed(1)}`: 'N/A'} m</span>
          <span className="info-label">Altitude</span>
        </div>
      </div>
      <div className="real-time-text">
        -Real Time-
      </div>
    </div>
  );
};

export default LeftColumnBtn;

