import { CssBaseline } from '@mui/material';
import "../assets/styles/customerMain.css";
import Statistics from "../compoenents/CustomerMailDetailPannel/Statistics";
import MapDashboard from "../compoenents/CustomerMailDetailPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/CustomerMailDetailPannel/LeftColumnBtn";
import WeatherTab from "../compoenents/CustomerMailDetailPannel/WeatherTab";

const CustomerMainDetail = () => {

return (
  <div className="grid-container">
      <CssBaseline />
      <div className="header"><Statistics /></div>
      <div className="left-column"><LeftColumnBtn /></div>
      <div className="center-column"><MapDashboard /></div>
      <div className="right-column"><WeatherTab /></div>
    </div>
);
};

export default CustomerMainDetail;

