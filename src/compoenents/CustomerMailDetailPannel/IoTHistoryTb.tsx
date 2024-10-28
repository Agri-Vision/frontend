import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, CircularProgress } from '@mui/material';

interface IoTData {
  id: number;
  recordedDateTime: string;
  temperature: string;
  humidity: string;
  uvLevel: string;
  soilMoisture: string;
  pressure: string;
  altitude: string;
}

const IoTHistoryTb: React.FC = () => {
  const [data, setData] = useState<IoTData[]>([]);
  const [selectedData, setSelectedData] = useState<IoTData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Ideal conditions for tea plantations in Sri Lanka
  const idealConditions = {
    temperature: { min: 18, max: 30, label: "" },
    humidity: { min: 70, max: 90, label: "" },
    uvLevel: { min: 0, max: 3, label: "" },
    soilMoisture: { min: 200, max: 400, label: "" },
    pressure: { min: 100000, max: 102000, label: "" },
    altitude: { min: 600, max: 2500, label: "" },
  };

  // Function to compare the IoT data to the ideal conditions
  const checkValue = (value: number, range: { min: number; max: number }) => {
    if (value >= range.min && value <= range.max) {
      return 'Ideal'; 
    } else if (value < range.min) {
      return 'Too Low'; 
    } else {
      return 'Too High'; 
    }
  };

  // Convert time to 12-hour format
  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    let hour = parseInt(hours);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format, making '0' hours as '12'
    return `${hour}:${minutes}:${seconds} ${amPm}`;
  };

  useEffect(() => {
    setLoading(true); 
    const fetchIoTData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/iot/get_enviroment_data`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        const transformedData: IoTData[] = result.map((item: any) => ({
          id: item.id,
          recordedDateTime: `${item.recorded_date}, ${convertTo12HourFormat(item.recorded_time)}`,
          temperature: `${parseFloat(item.temperature).toFixed(0)} ℃` ,
          humidity: `${parseFloat(item.humidity).toFixed(0)} %` ,
          uvLevel: item.uvLevel,
          soilMoisture: `${((parseFloat(item.soilMoisture) - 205) * 100 / (580 - 205)).toFixed(1)} %` ,
          pressure: `${parseFloat(item.pressure).toFixed(1)} Pa` ,
          altitude: `${parseFloat(item.altitude).toFixed(0)} m` ,
        }));

        const sortedData = transformedData.sort((a, b) => b.id - a.id);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching IoT data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchIoTData();
  }, [API_BASE_URL]);

  const handleRowClick = (rowData: IoTData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };

  // Define table columns
  const columns = [
    { label: 'Recorded Date & Time', key: 'recordedDateTime' },
    { label: 'Temperature', key: 'temperature' },
    { label: 'Humidity', key: 'humidity' },
    { label: 'UV Level', key: 'uvLevel' },
    { label: 'Soil Moisture', key: 'soilMoisture' },
    { label: 'Pressure', key: 'pressure' },
    { label: 'Altitude', key: 'altitude' },
    {
      label: 'View',
      key: 'view',
      render: (rowData: IoTData) => (
        <Button onClick={(e) => {
          e.stopPropagation(); // Prevent triggering row click
          handleRowClick(rowData);
        }} 
        sx={{
          fontFamily: 'Nunito, Poppins, sans-serif',
          padding: '4px 8px',
          fontSize: '0.85rem',
          minWidth: '80px',
          height: '32px'
        }}
        variant="contained" color="primary">
          View
        </Button>
      )
    }
  ];

  return (
    <div className="history-table-container">
      <h2>IOT History</h2>

      {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <ReusableTable columns={columns} data={data} onRowClick={handleRowClick} recordsPerPage={5} />
      )}

      

      {/* MUI Modal for showing IoT data details */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: 20, 
        }
      }}>
        <DialogTitle style={{ color: '#4CAF50', fontWeight: 'bold' }}>IoT Data Details & Suitability for Tea Plantations</DialogTitle>
        <DialogContent style={{ backgroundColor: '#F1F8E9' }}>
          {selectedData ? (
            <>
              <Typography variant="h6" color="textPrimary"><strong>Recorded Date & Time:</strong> {selectedData.recordedDateTime}</Typography>

              {/* Display Temperature with suitability check */}
              <Box display="flex" justifyContent="space-between" my={2}>
                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Temperature</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.temperature} 
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.temperature), idealConditions.temperature)}
                  </Typography>
                </Box>

                {/* Display Humidity with suitability check */}
                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Humidity</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.humidity} 
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.humidity), idealConditions.humidity)}
                  </Typography>
                </Box>
              </Box>

              {/* Display UV Level and Soil Moisture with suitability check */}
              <Box display="flex" justifyContent="space-between" my={2}>
                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">UV Level</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.uvLevel}
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.uvLevel), idealConditions.uvLevel)}
                  </Typography>
                </Box>

                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Soil Moisture</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.soilMoisture}
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.soilMoisture), idealConditions.soilMoisture)}
                  </Typography>
                </Box>
              </Box>

              {/* Display Pressure and Altitude with suitability check */}
              <Box display="flex" justifyContent="space-between" my={2}>
                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Pressure</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.pressure} 
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.pressure), idealConditions.pressure)}
                  </Typography>
                </Box>

                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Altitude</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.altitude} 
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.altitude), idealConditions.altitude)}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#F1F8E9' }}>
          <Button onClick={() => setShowModal(false)} variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IoTHistoryTb;




