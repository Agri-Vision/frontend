import React, { useEffect, useState } from 'react';
import '../../assets/styles/leftColumnBtn.css';
import {Button, CircularProgress, Box} from '@mui/material'; 
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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(true);
  // Importing from ButtonContext to toggle stress, yield, and disease
  const { isStressActive, toggleStress, isDiseaseActive, toggleDisease, isYieldActive, toggleYield } = useButtonContext();

  // Function to fetch the latest IoT data
  const fetchIoTData = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`${API_BASE_URL}/iot/get_enviroment_data`);
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
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchIoTData();
  }, []);

  const handleToggleStress = () => toggleStress(); // Toggle stress state using context
  const handleToggleDisease = () => toggleDisease(); // Toggle disease state using context
  const handleToggleYield = () => toggleYield(); // Toggle yield state using context

  return (
    <div className="sidebar-container">
      <div className="buttons-container">
        {/* Yield Button */}
        <Button
          variant="contained"
          className="control-button"
          sx={{
            backgroundColor: isYieldActive ? '#061a29' : '#5c8843', 
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: isYieldActive ? '#061a29' : '#061a29', 
            },
          }}
          onClick={handleToggleYield}
        >
          Yield
        </Button>

        {/* Stress Button */}
        <Button
          variant="contained"
          className="control-button"
          sx={{
            backgroundColor: isStressActive ? '#061a29' : '#5c8843', 
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: isStressActive ? '#061a29' : '#061a29', 
            },
          }}
          onClick={handleToggleStress} // Use toggle from context
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
        {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <span className="info-value">{iotData?.temperature ? `${parseFloat(iotData.temperature).toFixed(1)}`: 'N/A'} &#8451; </span>
        <span className="info-label">Temperature</span>
        </div>
      )}
        </div>

        <div className="info-card highlight-humidity">
        {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
           <span className="info-value">{iotData?.humidity ? `${parseFloat(iotData.humidity).toFixed(1)}`: 'N/A'} % </span>
           <span className="info-label">Humidity</span>
        </div>
      )}

        </div>

        <div className="info-card highlight-soil">

        {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <span className="info-value-soil">
                  {iotData?.soilMoisture
                    ? `${((parseFloat(iotData.soilMoisture) - 205) * 100 / (580 - 205)).toFixed(1)}%`
                    : 'N/A'}
                </span><br></br>
                <span className="info-label">Soil Moisture</span>
        </div>
      )}

                
          </div>

        <div className="info-card highlight-uv">
        {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
         <span className="info-value">{iotData?.uvLevel ?? 'N/A'}</span><br></br>
         <span className="info-label">UV</span>
        </div>
      )}
          
        </div>
        <div className="info-card highlight-pressure">
        {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <span className="info-value-soil">{iotData?.pressure ? `${parseFloat(iotData.pressure).toFixed(1)}`: 'N/A'} Pa</span><br></br>
          <span className="info-label">Atmo.Pressure</span>
        </div>
      )}
          
        </div>
        <div className="info-card highlight-altitude">
        {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <span className="info-value">{iotData?.altitude ? `${parseFloat(iotData.altitude).toFixed(1)}`: 'N/A'} m</span><br></br>
          <span className="info-label">Altitude</span>
        </div>
      )}
          
        </div>
      </div>
      <div className="real-time-text">
        -Real Time-
      </div>
    </div>
  );
};

export default LeftColumnBtn;

