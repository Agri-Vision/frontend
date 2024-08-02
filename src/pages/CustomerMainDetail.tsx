import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CssBaseline } from '@mui/material';

import Statistics from "../compoenents/CustomerMailDetailPannel/Statistics";
import MapDashboard from "../compoenents/CustomerMailDetailPannel/MapDashboard";


const CustomerMainDetail = () => {

return (
  <>
    <CssBaseline />
    <Statistics />
    <MapDashboard />
  </>
);
    <div>
      <CssBaseline />
<Statistics/>
<MapDashboard/>
    </div>
  );
};

export default CustomerMainDetail;

