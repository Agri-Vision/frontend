// import React, { useEffect, useState } from 'react';
// import '../../assets/styles/leftColumnBtn.css';
// import Button from '@mui/material/Button'; 

// interface IoTData {
//   temperature: string;
//   humidity: string;
//   uvLevel: string;
//   soilMoisture: string;
//   pressure: string;
//   altitude: string;
// }

// const LeftColumnBtn: React.FC = () => {
//   const [iotData, setIotData] = useState<IoTData | null>(null);

//   // Updated API endpoint
//   const API_BASE_URL = 'http://localhost:8070/iot/get_enviroment_data';

//   // Function to fetch the latest IoT data
//   const fetchIoTData = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}`);
//       const data = await response.json();

//       // Sort the data by the id in descending order
//       if (data.length > 0) {
//         const sortedData = data.sort((a: any, b: any) => b.id - a.id);
//         const latestData = sortedData[0];

//         setIotData({
//           temperature: latestData.temperature,
//           humidity: latestData.humidity,
//           uvLevel: latestData.uvLevel,
//           soilMoisture: latestData.soilMoisture,
//           pressure: latestData.pressure,
//           altitude: latestData.altitude,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching IoT data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchIoTData();
//   }, []);

//   const [isYieldActive, setIsYieldActive] = useState(false);
//   const [isStressActive, setIsStressActive] = useState(false);
//   const [isDiseaseActive, setIsDiseaseActive] = useState(false);

//   const handleToggleYield = () => setIsYieldActive(!isYieldActive);
//   const handleToggleStress = () => setIsStressActive(!isStressActive);
//   const handleToggleDisease = () => setIsDiseaseActive(!isDiseaseActive);

//   return (
//     <div className="sidebar-container">
//       <div className="buttons-container">
//         {/* Yield Button */}
//         <Button
//           variant="contained"
//           className="control-button"
//           sx={{
//             backgroundColor: isYieldActive ? '#061a29' : '#5c8843', 
//             borderRadius: '20px',
//             fontFamily: 'Nunito, Poppins, sans-serif',
//             fontWeight: 70,
//             '&:hover': {
//               backgroundColor: isYieldActive ? '#061a29' : '#061a29', 
//             },
//           }}
//           onClick={handleToggleYield}
//         >
//           Yield
//         </Button>

//         {/* Stress Button */}
//         <Button
//           variant="contained"
//           className="control-button"
//           sx={{
//             backgroundColor: isStressActive ? '#061a29' : '#5c8843', 
//             borderRadius: '20px',
//             fontFamily: 'Nunito, Poppins, sans-serif',
//             fontWeight: 70,
//             '&:hover': {
//               backgroundColor: isStressActive ? '#061a29' : '#061a29', 
//             },
//           }}
//           onClick={handleToggleStress}
//         >
//           Stress
//         </Button>

//         {/* Disease Button */}
//         <Button
//           variant="contained"
//           className="control-button"
//           sx={{
//             backgroundColor: isDiseaseActive ? '#061a29' : '#5c8843', 
//             borderRadius: '20px',
//             fontFamily: 'Nunito, Poppins, sans-serif',
//             fontWeight: 70,
//             '&:hover': {
//               backgroundColor: isDiseaseActive ? '#061a29' : '#061a29',
//             },
//           }}
//           onClick={handleToggleDisease}
//         >
//           Disease
//         </Button>

//       </div>
//       <div className="info-container">
//         <div className="info-card highlight-temperature">
//           <span className="info-value">{iotData?.temperature ? `${parseFloat(iotData.temperature).toFixed(1)}`: 'N/A'} &#8451; </span>
//           <span className="info-label">Temperature</span>
//         </div>
//         <div className="info-card highlight-humidity">
//           <span className="info-value">{iotData?.humidity ? `${parseFloat(iotData.humidity).toFixed(1)}`: 'N/A'} %</span>
//           <span className="info-label">Humidity</span>
//         </div>
//         <div className="info-card highlight-soil">
//           <span className="info-value-soil">{iotData?.soilMoisture ? `${parseFloat(iotData.soilMoisture).toFixed(1)}`: 'N/A'} Pa</span>
//           <span className="info-label">Soil Moisture</span>
//         </div>
//         <div className="info-card highlight-uv">
//           <span className="info-value">{iotData?.uvLevel ?? 'N/A'}</span>
//           <span className="info-label">UV</span>
//         </div>
//         <div className="info-card highlight-pressure">
//           <span className="info-value-soil">{iotData?.pressure ? `${parseFloat(iotData.pressure).toFixed(1)}`: 'N/A'} Pa</span>
//           <span className="info-label">Atmo.Pressure</span>
//         </div>
//         <div className="info-card highlight-altitude">
//           <span className="info-value">{iotData?.altitude ? `${parseFloat(iotData.altitude).toFixed(1)}`: 'N/A'} m</span>
//           <span className="info-label">Altitude</span>
//         </div>
//       </div>
//       <div className="real-time-text">
//         -Real Time-
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import '../../assets/styles/leftColumnBtn.css';
import Button from '@mui/material/Button'; 
import { useButtonContext } from '../ButtonContext'; 

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
  const { isStressActive, toggleStress } = useButtonContext(); // Removed Yield and Disease since they're default disabled

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

  const handleToggleStress = () => toggleStress(); // Toggle stress state using context

  return (
    <div className="sidebar-container">
      <div className="buttons-container">
        {/* Yield Button - Default Disabled */}
        <Button
          variant="contained"
          className="control-button"
          disabled={true} // Yield button is disabled by default
          sx={{
            backgroundColor: '#5c8843', // Default background for disabled
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: '#5c8843', // No change on hover due to disabled state
            },
          }}
        >
          Yield
        </Button>

        {/* Stress Button - Enabled */}
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

        {/* Disease Button - Default Disabled */}
        <Button
          variant="contained"
          className="control-button"
          disabled={true}  // Disease button is disabled by default
          sx={{
            backgroundColor: '#5c8843', // Default background for disabled
            borderRadius: '20px',
            fontFamily: 'Nunito, Poppins, sans-serif',
            fontWeight: 70,
            '&:hover': {
              backgroundColor: '#5c8843', // No change on hover due to disabled state
            },
          }}
        >
          Disease
        </Button>
      </div>

      <div className="info-container">
        <div className="info-card highlight-temperature">
          <span className="info-value">{iotData?.temperature ? `${parseFloat(iotData.temperature).toFixed(1)}` : 'N/A'} &#8451; </span>
          <span className="info-label">Temperature</span>
        </div>
        <div className="info-card highlight-humidity">
          <span className="info-value">{iotData?.humidity ? `${parseFloat(iotData.humidity).toFixed(1)}` : 'N/A'} %</span>
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
          <span className="info-value-soil">{iotData?.pressure ? `${parseFloat(iotData.pressure).toFixed(1)}` : 'N/A'} Pa</span>
          <span className="info-label">Atmo.Pressure</span>
        </div>
        <div className="info-card highlight-altitude">
          <span className="info-value">{iotData?.altitude ? `${parseFloat(iotData.altitude).toFixed(1)}` : 'N/A'} m</span>
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
