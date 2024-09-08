import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';

interface IoTData {
  id: number;
  recordedDate: string;
  temperature: string;
  humidity: string;
  uvLevel: string;
  soilMoisture: string;
  pressure: string;
  altitude: string;
}

const IoTHistoryTb: React.FC = () => {
  const [data, setData] = useState<IoTData[]>([]);

  // Using Vite environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchIoTData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/iot`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: IoTData[] = await response.json();

        // Sort the data by 'id' in descending order to get the latest records first
        const sortedData = result.sort((a, b) => b.id - a.id);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching IoT data:', error);
      }
    };

    fetchIoTData();
  }, [API_BASE_URL]);

  // Define table columns
  const columns = [
    { label: 'Recorded Date', key: 'recordedDate' },
    { label: 'Temperature', key: 'temperature' },
    { label: 'Humidity', key: 'humidity' },
    { label: 'UV Level', key: 'uvLevel' },
    { label: 'Soil Moisture', key: 'soilMoisture' },
    { label: 'Pressure', key: 'pressure' },
    { label: 'Altitude', key: 'altitude' },
  ];

  // Handle row click (optional)
  const handleRowClick = (rowData: IoTData) => {
    console.log('Row clicked:', rowData);
  };

  return (
    <div className="history-table-container">
      <h2>IOT History</h2>
      <ReusableTable columns={columns} data={data} onRowClick={handleRowClick} recordsPerPage={5} />
    </div>
  );
};

export default IoTHistoryTb;
