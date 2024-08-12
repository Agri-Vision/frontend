import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

const MapDashboard: React.FC = () => {

  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509906!2d144.9537363155046!3d-37.8162797420218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57761c21b23e9b7!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1616399354946!5m2!1sen!2sau";

  return (
<Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <iframe
            width="100%"
            height="510"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={googleMapsUrl}
          ></iframe>
        </Paper>
      </Grid>
    </Grid>


  );
};

export default MapDashboard;
