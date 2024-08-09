import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import '../../assets/styles/leftColumnBtn.css';


const LeftColumnBtn: React.FC = () => {
  return (
    
    // <Box p={3}>
    //   <Grid container spacing={3}>
    //     {/* Sidebar and Weather Information */}
    //     <Grid item xs={12} md={3}>
    //       <Grid container spacing={3}>
    //         {/* Sidebar */}
    //         <Grid item xs={12}>
    //           <Paper elevation={3} sx={{ p: 2 }}>
    //             <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
    //               Yield
    //             </Button>
    //             <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
    //               Stress
    //             </Button>
    //             <Button fullWidth variant="contained" color="primary">
    //               Disease
    //             </Button>
    //           </Paper>
    //         </Grid>
    //         {/* Weather Information */}
    //         <Grid item xs={12}>
    //           <Paper elevation={3} sx={{ p: 2 }}>
    //             <Typography variant="h6">Weather Information</Typography>
    //             <Typography variant="body1">Mon, Jul 22</Typography>
    //             <Typography variant="body2">Kotte</Typography>
    //             <Typography variant="body2">Temperature: 31.7°C</Typography>
    //             <Typography variant="body2">Humidity: 85%</Typography>
    //           </Paper>
    //         </Grid>
    //       </Grid>
    //     </Grid>

      
    //   </Grid>
    // </Box>

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
