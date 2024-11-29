import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Typography, Grid, Card, CardContent } from '@mui/material';
import { useIoTContext } from '../IoTContext'; // Import the IoTContext
import { useMapTypeContext } from '../MapTypeContext'; // Import the MapTypeContext
import { SelectChangeEvent } from '@mui/material';  // Import SelectChangeEvent

const MapController: React.FC = () => {
  const { iotEnabled, toggleIoT } = useIoTContext();  // Access IoT context
  const { mapType, setMapType } = useMapTypeContext();  // Access MapType context

  // Use SelectChangeEvent<string> as the event type
  const handleMapChange = (event: SelectChangeEvent<string>) => {
    setMapType(event.target.value as string);  // Update mapType globally
  };

  return (
    <Card elevation={1} sx={{ maxWidth: 300, mx: 'auto', mt: 3, backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
      <CardContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
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

          {/* Map Type Selection */}
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
                onChange={handleMapChange}  // Correct event handler
                label="Map Type"
              >
                <MenuItem value="drone">Drone Map</MenuItem>
                <MenuItem value="ndvi">NDVI Map</MenuItem>
                <MenuItem value="rendvi">RENDVI Map</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* IoT Toggle Switch */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={iotEnabled}
                  onChange={toggleIoT}  // Toggle IoT state
                  color="warning"
                  size="small"
                  sx={{ pl: 1, m: 1 }} 
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
