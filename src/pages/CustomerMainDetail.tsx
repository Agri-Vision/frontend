import { CssBaseline } from '@mui/material';
import "../assets/styles/customerMain.css";
import Statistics from "../compoenents/CustomerMailDetailPannel/Statistics";
import MapDashboard from "../compoenents/CustomerMailDetailPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/CustomerMailDetailPannel/LeftColumnBtn";

const CustomerMainDetail = () => {

return (
  // <>
  //   <CssBaseline />
  //   <Statistics />
  //   <MapDashboard />
  // </>

<div className="grid-container">
<div className="header"><Statistics /></div>
<div className="left-column"><LeftColumnBtn /></div>
<div className="right-column"><MapDashboard /></div>
</div>

);
};

export default CustomerMainDetail;

