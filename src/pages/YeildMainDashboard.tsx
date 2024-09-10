import { CssBaseline } from '@mui/material';
import "../assets/styles/yeildMain.css";
import Statistics from "../compoenents/YeildMainDashboardPannel/Statistics";
import MapDashboard from "../compoenents/YeildMainDashboardPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/YeildMainDashboardPannel/LeftColumnBtn";
import RightPannel from "../compoenents/YeildMainDashboardPannel/RightPannel";
import IotDetailPannel from "../compoenents/YeildMainDashboardPannel/IotDetailPannel";
import YeildTb from "../compoenents/YeildMainDashboardPannel/YeildTb";

const YeildMainDashboard = () => {
 
return (
  <div className="grid-container">
      <CssBaseline />
      <div className="header"><Statistics /></div>
      <div className="left-column"><LeftColumnBtn /></div>
      <div className="center-column"><MapDashboard /></div>
      <div className="right-column"><RightPannel /></div>
      <div className="iot-container" ><IotDetailPannel /></div>
      <div className="iot-History-Table" ><YeildTb /></div>
      
    </div>
);
};

export default YeildMainDashboard;

