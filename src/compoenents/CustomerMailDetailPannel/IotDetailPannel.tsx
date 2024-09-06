import React from 'react';
import '../../assets/styles/iotDetailPannel.css';
import IoTCard from './IoTCard';


const IotDetailPannel: React.FC = () => {
  const temperatureData = [
    { date: '2024-07-01', value: 21.25 },
    { date: '2024-07-02', value: 22.15 },
    { date: '2024-07-03', value: 23.05 },
    { date: '2024-07-04', value: 24.05 },
    { date: '2024-07-05', value: 26.05 },
    { date: '2024-07-06', value: 21.05 },
    { date: '2024-07-07', value: 27.05 },
    { date: '2024-07-08', value: 20.05 },
    { date: '2024-07-09', value: 25.05 },
    { date: '2024-07-10', value: 20.05 },
    { date: '2024-07-11', value: 21.05 },
    { date: '2024-07-12', value: 23.45 },
    { date: '2024-07-13', value: 20.05 },
    { date: '2024-07-14', value: 23.45 },
    { date: '2024-07-15', value: 27.05 },
    { date: '2024-07-16', value: 21.05 },
    { date: '2024-07-17', value: 28.05 },
    { date: '2024-07-18', value: 22.05 },
    { date: '2024-07-19', value: 25.05 },
    { date: '2024-07-20', value: 24.05 },
    { date: '2024-07-21', value: 21.05 },
    
  ];

  const humidityData = [
    { date: '2024-07-01', value: 65 },
    { date: '2024-07-02', value: 67 },
    { date: '2024-07-03', value: 70 },
    // More data points...
  ];

  const soilMoistureData = [
    { date: '2024-07-01', value: 45 },
    { date: '2024-07-02', value: 47 },
    { date: '2024-07-03', value: 50 },
    // More data points...
  ];

  const uvLevelData = [
    { date: '2024-07-01', value: 5 },
    { date: '2024-07-02', value: 6 },
    { date: '2024-07-03', value: 7 },
    // More data points...
  ];

  const altitudeData = [
    { date: '2024-07-01', value: 1000 },
    { date: '2024-07-02', value: 1020 },
    { date: '2024-07-03', value: 1015 },
    // More data points...
  ];

  const atmosphericPressureData = [
    { date: '2024-07-01', value: 1012 },
    { date: '2024-07-02', value: 1010 },
    { date: '2024-07-03', value: 1013 },
    // More data points...
  ];

  return (
    <div className="iot-row">
      <IoTCard title="Temperature" data={temperatureData} />
      <IoTCard title="Humidity" data={humidityData} />
      <IoTCard title="Soil Moisture" data={soilMoistureData} />
      <IoTCard title="UV Level" data={uvLevelData} />
      <IoTCard title="Altitude" data={altitudeData} />
      <IoTCard title="Atmospheric Pressure" data={atmosphericPressureData} />
    </div>
  );
};

export default IotDetailPannel;
