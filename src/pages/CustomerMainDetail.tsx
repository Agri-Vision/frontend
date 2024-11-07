import { CssBaseline } from '@mui/material';
import "../assets/styles/customerMain.css";
import Statistics from "../compoenents/CustomerMailDetailPannel/Statistics";
import MapDashboard from "../compoenents/CustomerMailDetailPannel/MapDashboard";
import LeftColumnBtn from "../compoenents/CustomerMailDetailPannel/LeftColumnBtn";
import RightPannel from "../compoenents/CustomerMailDetailPannel/RightPannel";
import IotDetailPannel from "../compoenents/CustomerMailDetailPannel/IotDetailPannel";
import IoTHistoryTb from "../compoenents/CustomerMailDetailPannel/IoTHistoryTb";
import { useButtonContext } from '../compoenents/ButtonContext'; // Import the ButtonContext
import YeildTb from "../compoenents/CustomerMailDetailPannel/YeildTb";
import StressTb from "../compoenents/CustomerMailDetailPannel/StressTb";
import DiseaseTb from "../compoenents/CustomerMailDetailPannel/DiseaseTb";

const CustomerMainDetail = () => {
  const { isYieldActive, isStressActive, isDiseaseActive } = useButtonContext(); // Get the states from context

  return (
    <div className="grid-container">
      <CssBaseline />
      <div className="header"><Statistics /></div>
      <div className="left-column"><LeftColumnBtn /></div>
      <div className="center-column"><MapDashboard /></div>
      <div className="right-column"><RightPannel /></div>
      <div className="iot-container"><IotDetailPannel /></div>

      {/* Conditional rendering of tables based on the active toggle */}
      {isYieldActive && !isStressActive && !isDiseaseActive && (
        <div className="iot-History-Table">
          <YeildTb />
        </div>
      )}

      {isStressActive && (
        <>
          <div className="stress-Table">
            <StressTb />
          </div>
          <div className="iot-History-Table">
            <IoTHistoryTb />
          </div>
        </>
      )}

      {isDiseaseActive && !isStressActive && !isYieldActive && (
        <div className="iot-container">
          <DiseaseTb />
        </div>
      )}

      {/* Default state: only show IoTHistoryTb if no specific toggle is active */}
      {!isYieldActive && !isStressActive && !isDiseaseActive && (
        <div className="iot-History-Table">
          <IoTHistoryTb />
        </div>
      )}
    </div>
  );
};

export default CustomerMainDetail;
