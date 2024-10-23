import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { strict } from 'assert';

interface IoTData {
  rowCol: string;
  id: number;
  recordedDateTime: string;
  temperature: string;
  humidity: string;
  uvLevel: string;
  diseaseVulnerability: string; // To store disease vulnerability from second API
}

const DiseaseTb: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState<IoTData[]>([]);
  const [selectedData, setSelectedData] = useState<IoTData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const TILE_API_URL = `${API_BASE_URL}/project/tiles/by/project/${id}`;
  const PREDICTION_API_URL = (tileId: number) => `${API_BASE_URL}/prediction/disease/health-score/${tileId}`;

  // Convert time to 12-hour format
  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    let hour = parseInt(hours);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format, making '0' hours as '12'
    return `${hour}:${minutes}:${seconds} ${amPm}`;
  };

  // Fetch disease vulnerability for a tile
  const fetchDiseaseVulnerability = async (tileId: number) => {
    try {
      const response = await fetch(PREDICTION_API_URL(tileId));
      if (!response.ok) {
        throw new Error(`Failed to fetch disease vulnerability for tile ID: ${tileId}`);
      }
      const result = await response.json();
      return result.result || 'Unknown'; // Default value if the result is not present
    } catch (error) {
      console.error('Error fetching disease vulnerability:', error);
      return 'Unknown';
    }
  };

  // Fetch tile data and merge with disease vulnerability
  const fetchTileData = async () => {
    try {
      const tileResponse = await fetch(TILE_API_URL);
      if (!tileResponse.ok) {
        throw new Error('Failed to fetch tile data');
      }
      const tiles = await tileResponse.json();

      // Fetch disease vulnerability for each tile
      const transformedData: IoTData[] = await Promise.all(
        tiles.map(async (tile: any) => {
          const diseaseVulnerability = await fetchDiseaseVulnerability(tile.id);
          return {
            id: tile.rowCol,
            recordedDateTime: `${tile.createdDate}, ${convertTo12HourFormat(tile.createdDate.split(' ')[1])}`,
            temperature: tile.temperature,
            humidity: tile.humidity,
            uvLevel: tile.uvLevel,
            diseaseVulnerability: diseaseVulnerability, // From second API
          };
        })
      );

      const sortedData = transformedData.sort((a, b) => b.id - a.id);
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTileData();
  }, []);

  const handleRowClick = (rowData: IoTData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };

  // Define table columns
  const columns = [
    { label: 'Block ID', key: 'id' },
    { label: 'Temperature', key: 'temperature' },
    { label: 'Humidity', key: 'humidity' },
    { label: 'UV Level', key: 'uvLevel' },
    { label: 'Disease Vulnerability', key: 'diseaseVulnerability' },
  ];

  return (
    <div className="history-table-container">
      <h2>Disease Analysis</h2>
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
              <Typography variant="h6" color="textPrimary"><strong>Block ID:</strong> {selectedData.rowCol}</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Temperature:</strong> {selectedData.temperature} °C</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Humidity:</strong> {selectedData.humidity} %</Typography>
              <Typography variant="h6" color="textPrimary"><strong>UV Level:</strong> {selectedData.uvLevel}</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Disease Vulnerability:</strong> {selectedData.diseaseVulnerability}</Typography>
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

export default DiseaseTb;
