
import React, { useEffect } from 'react';
import '../../assets/styles/ioTCard.css';
import { createChart } from './AmChartSetup'; // This will be a helper function for setting up the chart

interface IoTCardProps {
  title: string;
  data: { date: string, value: number }[];
}

const IoTCard: React.FC<IoTCardProps> = ({ title, data }) => {

  useEffect(() => {
    createChart(data, `${title}-chart`); // Create the chart using the dummy data
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

