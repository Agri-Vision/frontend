import { CssBaseline } from '@mui/material';
import "../assets/styles/diseaseMain.css";
import Statistics from "../compoenents/DiseaseMainDashboardPannel/Statistics";
import MapDashboard from "../compoenents/DiseaseMainDashboardPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/DiseaseMainDashboardPannel/LeftColumnBtn";
import RightPannel from "../compoenents/DiseaseMainDashboardPannel/RightPannel";
import IotDetailPannel from "../compoenents/DiseaseMainDashboardPannel/IotDetailPannel";
import DiseaseTb from "../compoenents/DiseaseMainDashboardPannel/DiseaseTb";


const DiseaseMainDashboard = () => {
 
return (
  <div className="grid-container">
      <CssBaseline />
      <div className="header"><Statistics /></div>
      <div className="left-column"><LeftColumnBtn /></div>
      <div className="center-column"><MapDashboard /></div>
      <div className="right-column"><RightPannel /></div>
      <div className="iot-container" ><IotDetailPannel /></div>
      <div className="iot-container" ><DiseaseTb /></div>
      
    </div>
);
};

export default DiseaseMainDashboard;

