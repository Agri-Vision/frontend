import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useMapHighlightContext } from '../MapHighlightContext';

interface IoTData {
  rowCol: string;
  id: number;
  recordedDateTime: string;
  temperature: string;
  humidity: string;
  uvLevel: string;
  diseaseVulnerability: string;
}

const DiseaseTb: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState<IoTData[]>([]);
  const [selectedData, setSelectedData] = useState<IoTData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { highlightedBlock, highlightBlock, removeHighlight } = useMapHighlightContext();

  const TILE_API_URL = `${API_BASE_URL}/project/tiles/by/project/${id}`;
  const PREDICTION_API_URL = (tileId: number) => `${API_BASE_URL}/prediction/disease/health-score/${tileId}`;

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    let hour = parseInt(hours);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minutes}:${seconds} ${amPm}`;
  };

  const extractPercentage = (result: string) => {
    const match = result.match(/(\d+(\.\d+)?)%/);
    return match ? `${parseFloat(match[1])}%` : 'Unknown';
  };

  const fetchDiseaseVulnerability = async (tileId: number) => {
    try {
      const response = await fetch(PREDICTION_API_URL(tileId));
      if (!response.ok) {
        throw new Error(`Failed to fetch disease vulnerability for tile ID: ${tileId}`);
      }
      const result = await response.json();
      return extractPercentage(result.result || 'Unknown');
    } catch (error) {
      console.error('Error fetching disease vulnerability:', error);
      return 'Unknown';
    }
  };

  const fetchTileData = async () => {
    setLoading(true); 
    try {
      const tileResponse = await fetch(TILE_API_URL);
      if (!tileResponse.ok) {
        throw new Error('Failed to fetch tile data');
      }
      const tiles = await tileResponse.json();
  
      // Calculate the number of columns dynamically based on the maximum column index in rowCol
      const maxColIndex = Math.max(...tiles.map((tile: any) => parseInt(tile.rowCol.split('_')[1])));
      const numCols = maxColIndex + 1; // Assuming column indices start at 0
  
      const transformedData: IoTData[] = await Promise.all(
        tiles.map(async (tile: any) => {
          const diseaseVulnerability = await fetchDiseaseVulnerability(tile.id);
  
          // Extract row and column indices from tile.rowCol (format: "row_col")
          const [rowIndex, colIndex] = tile.rowCol.split('_').map(Number);
  
          // Calculate the blockId
          const blockId = rowIndex * numCols + colIndex + 1;
  
          return {
            rowCol: `B${blockId}`, // Set rowCol to formatted blockId as "B{blockId}"
            id: tile.id,
            recordedDateTime: `${tile.createdDate}, ${convertTo12HourFormat(tile.createdDate.split(' ')[1])}`,
            temperature: tile.temperature,
            humidity: tile.humidity,
            uvLevel: tile.uvLevel,
            diseaseVulnerability: diseaseVulnerability, // Only percentage
          };
        })
      );
  
      // Sort data by id and set the state
      const sortedData = transformedData.sort((a, b) => b.id - a.id);
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };
  

  useEffect(() => {
    fetchTileData();
  }, []);

  const handleViewClick = (rowData: IoTData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };

  const handleLocateClick = (rowData: IoTData) => {
    if (highlightedBlock === rowData.rowCol) {
      console.log("Unlocating Block ID:", rowData.rowCol);
      removeHighlight();
    } else {
      console.log("Locating Block ID:", rowData.rowCol);
      highlightBlock(rowData.rowCol);
    }
  };
  const columns = [
    { label: 'Block ID ', key: 'rowCol' },
    { label: 'Temperature (℃)', key: 'temperature' },
    { label: 'Humidity (%)', key: 'humidity' },
    { label: 'UV Level', key: 'uvLevel' },
    { label: 'Disease Vulnerability', key: 'diseaseVulnerability' },
    {
      label: 'Locate',
      key: 'locate',
      render: (rowData: IoTData) => (
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering row click
            handleLocateClick(rowData);
          }} 
          variant="contained" 
          color={highlightedBlock === rowData.rowCol ? "error" : "primary"}
          sx={{
            backgroundColor: highlightedBlock === rowData.rowCol ? 'rgba(6,26,41,255)' : undefined,
            '&:hover': {
              backgroundColor: highlightedBlock === rowData.rowCol ? 'primary' : undefined,
            },
            fontFamily: 'Nunito, Poppins, sans-serif',
            padding: '4px 8px',
            fontSize: '0.85rem',
            minWidth: '80px',
            height: '32px'
          }}
        >
          {highlightedBlock === rowData.rowCol ? 'Unlocate' : 'Locate'}
        </Button>
      )
    },
    {
      label: 'View',
      key: 'view',
      render: (rowData: TileData) => (
        <Button onClick={(e) => {
          e.stopPropagation(); // Prevent triggering row click
          handleViewClick(rowData);
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
    <div className="history-table-container" style={{ marginTop: '30px' }}>
      <Typography variant="h4" mb={2}>Disease Analysis</Typography>

      {loading ? ( // Display loader if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Box display="flex" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" mr={2}>
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(0, 128, 0, 0.7)" mr={1} />
          <Typography variant="body2">Low Vulnerability to Diseases</Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(255, 255, 0, 0.7)" mr={1} />
          <Typography variant="body2">Moderate Vulnerability to Diseases</Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(255, 165, 0, 0.7)" mr={1} />
          <Typography variant="body2">Vulnerable to Diseases</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(255, 0, 0, 0.7)" mr={1} />
          <Typography variant="body2">High Vulnerability to Diseases</Typography>
        </Box>
      </Box>

      <ReusableTable columns={columns} data={data} onRowClick={handleViewClick} recordsPerPage={5} />
        </div>
      )}

      

      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: 20, 
        }
      }}>
        <DialogTitle style={{ color: '#4CAF50', fontWeight: 'bold' }}>IoT Data Details & Suitability for Tea Plantations</DialogTitle>
        <DialogContent style={{ backgroundColor: '#F1F8E9' }}>
          {selectedData ? (
            <>
              <Typography variant="h6" color="textPrimary"><strong>Block ID :</strong> {selectedData.rowCol}</Typography>
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
