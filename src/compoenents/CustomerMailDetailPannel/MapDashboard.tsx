import React, { useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { GoogleMap, LoadScript, Marker, GroundOverlay } from '@react-google-maps/api';

const MapDashboard: React.FC = () => {

  const center = {
    lat: (7.1947473 + 7.1942133) / 2,  // Average of north and south
    lng: (80.5402994 + 80.5399448) / 2 
  };

  // Define the bounds using the corner coordinates from gdalinfo
  const imageBounds = {
    north: 7.1947473,  // Upper Left latitude
    south: 7.1942133,  // Lower Right latitude
    east: 80.5402994,  // Lower Right longitude
    west: 80.5399448   // Upper Left longitude
  };

  // Log statements to debug
  useEffect(() => {
    console.log('Center coordinates:', center);
    console.log('Image bounds:', imageBounds);
    console.log('GroundOverlay image URL:', '/assets/img/maps/Gonadika-Holiday-Bungalow-RGB-compressed.jpg');
  }, []);

  // Callback when the image has successfully loaded
  const handleOverlayLoad = () => {
    console.log('GroundOverlay image has loaded successfully.');
  };

  // Callback when there is an error loading the image
  const handleOverlayError = (error) => {
    console.error('Error loading GroundOverlay image:', error);
  };

  return (
    <Grid container spacing={2} style={{ height: '100%', width: '100%' }}>
      <Grid item xs={12} style={{ height: '100%', width: '100%' }}>
        <Paper elevation={3} sx={{ p: 2, height: '100%', width: '100%' }}>
          <LoadScript googleMapsApiKey="AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={100} // Adjust zoom level as needed
            >
              <Marker position={center} />

              <GroundOverlay
                url="/assets/img/maps/Gonadika-Holiday-Bungalow-RGB-compressed.jpg" // Updated with the correct path
                bounds={imageBounds}
                opacity={1.0} // Set to fully opaque to test
                onLoad={handleOverlayLoad}  // Log success
                onError={handleOverlayError}  // Log errors
              />
              
            </GoogleMap>
          </LoadScript>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MapDashboard;
