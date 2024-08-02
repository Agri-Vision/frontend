import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapDashboard: React.FC = () => {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Sidebar and Weather Information */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
                  Yield
                </Button>
                <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
                  Stress
                </Button>
                <Button fullWidth variant="contained" color="primary">
                  Disease
                </Button>
              </Paper>
            </Grid>
            {/* Weather Information */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Weather Information</Typography>
                <Typography variant="body1">Mon, Jul 22</Typography>
                <Typography variant="body2">Kotte</Typography>
                <Typography variant="body2">Temperature: 31.7°C</Typography>
                <Typography variant="body2">Humidity: 85%</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Map */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} style={{
                      default: { fill: "#D6D6DA" },
                      hover: { fill: "#F53" },
                      pressed: { fill: "#E42" }
                    }} />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MapDashboard;