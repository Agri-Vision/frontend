import React, { useEffect } from 'react';
import '../../assets/styles/ioTCard.css';
import { createChart } from './AmChartSetup'; // This will be a helper function for setting up the chart

interface IoTCardProps {
  title: string;
  data: { date: string, value: number }[]; // Define the correct structure for data
}

const IoTCard: React.FC<IoTCardProps> = ({ title, data }) => {

  useEffect(() => {
    console.log(`useEffect for ${title}: Data length is`, data.length); // Log data length
    if (data.length > 0) {
      console.log(`Data for ${title}:`, data); // Log the data being passed to the chart

      // Check if the date is valid
      data.forEach(item => {
        console.log(`Date: ${new Date(item.date)} | Value: ${item.value}`);
      });

      createChart(data, `${title}-chart`); // Create the chart using the fetched data
    }
  }, [data, title]);

  return (
    <div className="iot-card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        <div id={`${title}-chart`} className="chart"></div>
      </div>
    </div>
  );
};

export default IoTCard;
