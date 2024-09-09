// import React, { useEffect, useState } from 'react';
// import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';

// interface IoTData {
//   id: number;
//   recordedDateTime: string;
//   temperature: string;
//   humidity: string;
//   uvLevel: string;
//   soilMoisture: string;
//   pressure: string;
//   altitude: string;
// }

// const IoTHistoryTb: React.FC = () => {
//   const [data, setData] = useState<IoTData[]>([]);

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const convertTo12HourFormat = (time: string) => {
//     const [hours, minutes, seconds] = time.split(':');
//     let hour = parseInt(hours);
//     const amPm = hour >= 12 ? 'PM' : 'AM';
//     hour = hour % 12 || 12; // Convert to 12-hour format, making '0' hours as '12'
//     return `${hour}:${minutes}:${seconds} ${amPm}`;
//   };

//   useEffect(() => {
//     const fetchIoTData = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/iot/get_enviroment_data`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const result = await response.json();

//         // Transform the data to include a combined 'recordedDateTime' field with 12-hour AM/PM format
//         const transformedData: IoTData[] = result.map((item: any) => ({
//           id: item.id,
//           recordedDateTime: `${item.recorded_date}, ${convertTo12HourFormat(item.recorded_time)}`,
//           temperature: item.temperature,
//           humidity: item.humidity,
//           uvLevel: item.uvLevel,
//           soilMoisture: item.soilMoisture,
//           pressure: item.pressure,
//           altitude: item.altitude,
//         }));

//         // Sort the data by 'id' in descending order to get the latest records first
//         const sortedData = transformedData.sort((a, b) => b.id - a.id);
//         setData(sortedData);
//       } catch (error) {
//         console.error('Error fetching IoT data:', error);
//       }
//     };

//     fetchIoTData();
//   }, [API_BASE_URL]);

//   // Define table columns
//   const columns = [
//     { label: 'Recorded Date & Time', key: 'recordedDateTime' },
//     { label: 'Temperature' , key: 'temperature' },
//     { label: 'Humidity', key: 'humidity' },
//     { label: 'UV Level', key: 'uvLevel' },
//     { label: 'Soil Moisture', key: 'soilMoisture' },
//     { label: 'Pressure', key: 'pressure' },
//     { label: 'Altitude', key: 'altitude' },
//   ];

//   // Handle row click (optional)
//   const handleRowClick = (rowData: IoTData) => {
//     console.log('Row clicked:', rowData);
//   };

//   return (
//     <div className="history-table-container">
//       <h2>IOT History</h2>
//       <ReusableTable columns={columns} data={data} onRowClick={handleRowClick} recordsPerPage={5} />
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';

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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Ideal conditions for tea plantations in Sri Lanka
  const idealConditions = {
    temperature: { min: 18, max: 30, label: "°C" },
    humidity: { min: 70, max: 90, label: "%" },
    uvLevel: { min: 0, max: 3, label: "" },
    soilMoisture: { min: 200, max: 400, label: "" },
    pressure: { min: 100000, max: 102000, label: "Pa" },
    altitude: { min: 600, max: 2500, label: "m" },
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
          temperature: item.temperature,
          humidity: item.humidity,
          uvLevel: item.uvLevel,
          soilMoisture: item.soilMoisture,
          pressure: item.pressure,
          altitude: item.altitude,
        }));

        const sortedData = transformedData.sort((a, b) => b.id - a.id);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching IoT data:', error);
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
  ];

  return (
    <div className="history-table-container">
      <h2>IOT History</h2>
      <ReusableTable columns={columns} data={data} onRowClick={handleRowClick} recordsPerPage={5} />

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
                    {selectedData.temperature} °C
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.temperature), idealConditions.temperature)}
                  </Typography>
                </Box>

                {/* Display Humidity with suitability check */}
                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Humidity</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.humidity} %
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
                    {selectedData.pressure} Pa
                  </Typography>
                  <Typography variant="body2">
                    Status: {checkValue(parseFloat(selectedData.pressure), idealConditions.pressure)}
                  </Typography>
                </Box>

                <Box style={{ backgroundColor: '#DAF5DB', padding: '10px', borderRadius: '10px', flexGrow: 1, margin: '5px' }}>
                  <Typography variant="h6">Altitude</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedData.altitude} m
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




