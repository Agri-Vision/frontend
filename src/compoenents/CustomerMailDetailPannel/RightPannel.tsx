import React from 'react';
import { Grid } from '@mui/material';
import WeatherTab from "../../compoenents/CustomerMailDetailPannel/WeatherTab";
import MapController from "../../compoenents/CustomerMailDetailPannel/MapController";
import '../../assets/styles/weatherTab.css';


const RightPannel: React.FC = () => {
 
  return (
    <Grid container spacing={2} direction="column" alignItems="center">
     
      <Grid item xs={12}>
      <MapController />
      </Grid>

      
      <Grid item xs={12}>
        <WeatherTab />
      </Grid>
    </Grid>

  );
};

export default RightPannel;





