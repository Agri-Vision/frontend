import React from 'react';
import '../../assets/styles/statCards.css';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="change">{change}</p>
    </div>
  );
};

const StatCards: React.FC = () => {
  return (
    <div className="stats-container">
      <StatCard title="Total Plantations" value="2" change="+8.5% Up from yesterday" />
      <StatCard title="Total Projects" value="10,293" change="+1.3% Up from past week" />
      <StatCard title="Updated Projects" value="89,000" change="-4.3% Down from yesterday" />
      <StatCard title="Total Pending" value="2,040" change="+1.8% Up from yesterday" />
    </div>
  );
};

export default StatCards;
