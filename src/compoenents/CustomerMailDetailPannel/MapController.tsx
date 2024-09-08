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
    <Card elevation={1} sx={{ maxWidth: 300, mx: 'auto', mt: 3, backgroundColor: '#f7f9fc', borderRadius: '12px' }}>
      <CardContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          
          {/* Header spanning two columns */}
          <Grid item xs={12}>
            <Typography variant="h6" align="center" gutterBottom>
              Map Controllers
            </Typography>
          </Grid>
          
          {/* First column: Map Type selection Dropdown */}
          <Grid item xs={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="map-type-label">Select Map</InputLabel>
              <Select
                labelId="map-type-label"
                value={mapType}
                onChange={handleMapChange}
                label="Map Type"
              >
                <MenuItem value="drone">Drone Map</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Second column: IoT Devices Toggle */}
          <Grid item xs={6}>
            <FormControlLabel
              control={<Switch checked={iotEnabled} onChange={handleIotToggle} color="warning" />}
              label="IoT Devices"
              labelPlacement="start"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MapController;
