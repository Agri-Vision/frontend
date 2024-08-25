import { CssBaseline } from '@mui/material';
import "../assets/styles/customerMain.css";
import Statistics from "../compoenents/CustomerMailDetailPannel/Statistics";
import MapDashboard from "../compoenents/CustomerMailDetailPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/CustomerMailDetailPannel/LeftColumnBtn";
import WeatherTab from "../compoenents/CustomerMailDetailPannel/WeatherTab";
import IotDetailPannel from "../compoenents/CustomerMailDetailPannel/IotDetailPannel";
import IoTHistoryTb from "../compoenents/CustomerMailDetailPannel/IoTHistoryTb";
import YieldHistoryTb from "../compoenents/CustomerMailDetailPannel/YieldHistoryTb";

const CustomerMainDetail = () => {

return (
  <div className="grid-container">
      <CssBaseline />
      <div className="header"><Statistics /></div>
      <div className="left-column"><LeftColumnBtn /></div>
      <div className="center-column"><MapDashboard /></div>
      <div className="right-column"><WeatherTab /></div>
      <div className="iot-container" ><IotDetailPannel /></div>
      <div className="iot-History-Table" ><IoTHistoryTb /></div>
      <div className="yield-History-Table" ><YieldHistoryTb /></div>
    </div>
);
};

export default CustomerMainDetail;

