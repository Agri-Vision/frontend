
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import '../../assets/styles/ioTHistoryTb.css';

interface HistoryData {
  name: string;
  organization: string;
  estate: string;
  yieldStressDisease: string;
}

const IoTHistoryTb: React.FC = () => {
  const [data, setData] = useState<HistoryData[]>([]);

  useEffect(() => {
    const dummyData: HistoryData[] = [
      {
        name: "John Doe",
        organization: "AgriCorp",
        estate: "North Field",
        yieldStressDisease: "High, Low, Medium",
      },
      {
        name: "Jane Smith",
        organization: "Farmers Inc.",
        estate: "West Field",
        yieldStressDisease: "Medium, High, Low",
      },
      {
        name: "Mike Johnson",
        organization: "GreenFields",
        estate: "South Field",
        yieldStressDisease: "Low, Medium, High",
      },
      // dummy data 
    ];

    // Simulate fetching data from an API
    setData(dummyData);
  }, []);

  return (
    <div className="history-table-container">
      <h2>IOT History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>UV Level</th>
            <th>Soil Moisture</th>
            <th>Atmospheric Pressure</th>
            <th>Altitude</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.organization}</td>
              <td>{item.estate}</td>
              <td>{item.yieldStressDisease}</td>
              <td>{item.name}</td>
              <td>{item.name}</td>
              <td>{item.name}</td>
              <td>{item.name}</td>
              <td><button className="view-button">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IoTHistoryTb;
