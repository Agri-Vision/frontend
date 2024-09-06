import React from 'react';
import '../../assets/styles/leftColumnBtn.css';


const LeftColumnBtn: React.FC = () => {
  return (
    
<div className="sidebar-container">
      <div className="buttons-container">
        <button className="control-button">Yield</button>
        <button className="control-button">Stress</button>
        <button className="control-button">Disease</button>
      </div>
      <div className="info-container">
        <div className="info-card highlight-temperature">
          <span className="info-value">24 &#8451; </span>
          <span className="info-label">Temperature</span>
        </div>
        <div className="info-card highlight-humidity">
          <span className="info-value">75 %</span>
          <span className="info-label">Humidity</span>
        </div>
        <div className="info-card highlight-soil">
        <span className="info-value">24 Pa</span>
          <span className="info-label">Soil Moisture</span>
        </div>
        <div className="info-card highlight-uv">
        <span className="info-value">24</span>
          <span className="info-label">UV</span>
        </div>
        <div className="info-card highlight-pressure">
        <span className="info-value">24 Pa</span>
          <span className="info-label">Atmo.Pressure</span>
        </div>
        <div className="info-card highlight-altitude">
        <span className="info-value">24 m</span>
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
