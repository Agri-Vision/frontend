import React, { useEffect, useState } from 'react';
import '../../assets/styles/iotDetailPannel.css';
import IoTCard from './IoTCard';

// Utility function to group data by a specified time interval
const groupDataByTime = (data: any[], intervalMinutes: number) => {
  const groupedData = [];
  const intervalInMs = intervalMinutes * 60 * 1000;

  // Sort data by time
  const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let lastTime = null;

  // Iterate through the sorted data
  for (let i = 0; i < sortedData.length; i++) {
    const currentTime = new Date(sortedData[i].date).getTime();

    // If this is the first record or the current record is in the next time slot
    if (!lastTime || currentTime - lastTime >= intervalInMs) {
      groupedData.push(sortedData[i]); // Add this record to the grouped data
      lastTime = currentTime;
    }
  }

  return groupedData;
};

interface IoTData {
  recorded_date: string;
  recorded_time: string;
  temperature?: string;
  humidity?: string;
  altitude?: string;
  pressure?: string;
  soilMoisture?: string;
  uvLevel?: string;
}

const IotDetailPannel: React.FC = () => {
  const [iotData, setIotData] = useState<IoTData[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/iot/get_enviroment_data`);
        const result = await response.json();

        console.log("Fetched API Data:", result);
        setIotData(result);
      } catch (error) {
        console.error("Error fetching IoT data:", error);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  // Convert string values to numbers and filter data based on the field name (e.g., temperature, humidity, etc.)
  const getFilteredData = (key: keyof IoTData, intervalMinutes: number = 60) => {
    const filteredData = iotData
      .filter(item => item[key] !== undefined) // Check if the key exists
      .map(item => ({
        date: `${item.recorded_date}T${item.recorded_time}`, // Combine date and time
        value: parseFloat(item[key] as string) // Convert the string value to a number
      }))
      .filter(item => !isNaN(item.value)); // Filter out invalid values

    // Group the filtered data by the specified time interval (e.g., every 60 minutes)
    const groupedData = groupDataByTime(filteredData, intervalMinutes);

    console.log(`Grouped data for ${key}:`, groupedData); // Log the grouped data for debugging

    return groupedData;
  };

  return (
    <div className="iot-row">
      <IoTCard title="Temperature" data={getFilteredData('temperature', 60)} />  
      <IoTCard title="Humidity" data={getFilteredData('humidity', 60)} />
      <IoTCard title="Soil Moisture" data={getFilteredData('soilMoisture', 60)} />
      <IoTCard title="UV Level" data={getFilteredData('uvLevel', 60)} />
      <IoTCard title="Altitude" data={getFilteredData('altitude', 60)} />
      <IoTCard title="Atmospheric Pressure" data={getFilteredData('pressure', 60)} />
    </div>
  );
};

export default IotDetailPannel;
