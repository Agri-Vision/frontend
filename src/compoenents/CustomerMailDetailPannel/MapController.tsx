import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Box, Typography, Grid, Card, CardContent, SelectChangeEvent } from '@mui/material';

const MapController: React.FC = () => {
  const [mapType, setMapType] = useState<string>('satellite');
  const [iotEnabled, setIotEnabled] = useState<boolean>(false);

  const handleMapChange = (event: SelectChangeEvent<string>) => {
    setMapType(event.target.value as string);
  };

  const handleIotToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIotEnabled(event.target.checked);
  };

  return (
    <Card elevation={1} sx={{ maxWidth: 300, mx: 'auto', mt: 3, backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
      <CardContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          
          {/* Header spanning two columns */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{
                fontFamily: 'Nunito, Poppins, sans-serif',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#5c8843'
              }}
            >
              MAP CONTROLLERS
            </Typography>
          </Grid>
          
          {/* Map Type Label and Selection in the same line */}
          <Grid item xs={4}>
            <Typography
              variant="h6"
              align="left"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'capitalize',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#5D6965',
                display: 'inline-block'
              }}
            >
              MAP TYPE
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="map-type-label">Select Map</InputLabel>
              <Select
                labelId="map-type-label"
                value={mapType}
                onChange={handleMapChange}
                label="Map Type"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="drone">Drone Map</MenuItem>
                <MenuItem value="satellite">NDVI Map</MenuItem>
                <MenuItem value="satellite">RENDVI Map</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* IoT Devices Label and Toggle */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={iotEnabled}
                  onChange={handleIotToggle}
                  color="warning"
                  size="small"
                  sx={{ pl: 1, m: 1 }} // Adds padding and margin to the switch
                />
              }
              label={
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'capitalize',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#5D6965'
                  }}
                >
                  IOT DEVICES
                </Typography>
              }
              labelPlacement="start"
              sx={{ justifyContent: 'space-between', ml: 0 }}
            />
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

export default MapController;
