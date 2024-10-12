import { CssBaseline } from '@mui/material';
import "../assets/styles/stressMain.css";
import Statistics from "../compoenents/StressMainDashboardPannel/Statistics";
import MapDashboard from "../compoenents/StressMainDashboardPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/StressMainDashboardPannel/LeftColumnBtn";
import RightPannel from "../compoenents/StressMainDashboardPannel/RightPannel";
import IotDetailPannel from "../compoenents/StressMainDashboardPannel/IotDetailPannel";
import IoTHistoryTb from "../compoenents/StressMainDashboardPannel/IoTHistoryTb";
import StressTb from "../compoenents/StressMainDashboardPannel/StressTb";

const StressMainDashboard = () => {
 
return (
  <div className="grid-container">
      <CssBaseline />
      <div className="header"><Statistics /></div>
      <div className="left-column"><LeftColumnBtn /></div>
      <div className="center-column"><MapDashboard /></div>
      <div className="right-column"><RightPannel /></div>
      <div className="iot-container" ><IotDetailPannel /></div>
      <div className="stress-Table" ><StressTb /></div>
      <div className="iot-History-Table" ><IoTHistoryTb /></div>
    </div>
);
};

export default StressMainDashboard;

