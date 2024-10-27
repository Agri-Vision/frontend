import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useMapHighlightContext } from '../MapHighlightContext';

interface TileData {
  rowCol: string;
  id: number;
  stressStatus: string;
  waterStress: string;
  actionForAverage: string;
}

const StressTb: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TileData[]>([]);
  const [selectedData, setSelectedData] = useState<TileData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const TILE_API_URL = `${API_BASE_URL}/project/tiles/by/project/${id}`;
  const PREDICTION_API_URL = (tileId: number) => `${API_BASE_URL}/prediction/stress/${tileId}`;

  const { highlightBlock } = useMapHighlightContext(); // Access the highlight function from context
  
  // Fetch Water Stress information using tile ID
  const fetchWaterStress = async (tileId: number) => {
    try {
      const response = await fetch(PREDICTION_API_URL(tileId));
      if (!response.ok) {
        throw new Error(`Failed to fetch water stress for tile ID: ${tileId}`);
      }
      const result = await response.json();
      const resultText = result.result || 'Unknown';

      // Split the result into water stress and action parts
      const [waterStress, actionForAverage] = resultText.includes('.') 
        ? resultText.split(/(?<=\.)/, 2).map((part: string) => part.trim()) 
        : [resultText, ''];

      return {
        waterStress: waterStress || 'Unknown',
        actionForAverage: actionForAverage || 'No Stress Detected.'
      };
    } catch (error) {
      console.error('Error fetching water stress:', error);
      return {
        waterStress: 'Unknown',
        actionForAverage: 'No Stress Detected.'
      };
    }
  };

 // Fetch the tile data and merge it with water stress info
const fetchTileData = async () => {
  try {
    const tileResponse = await fetch(TILE_API_URL);
    if (!tileResponse.ok) {
      throw new Error('Failed to fetch tile data');
    }
    const tiles = await tileResponse.json();

    // Calculate the number of columns dynamically from the tile data if not defined
    const maxColIndex = Math.max(...tiles.map((tile: any) => parseInt(tile.rowCol.split('_')[1])));
    const numCols = maxColIndex + 1; // Assuming column indices start at 0

    // Transform the tile data and fetch water stress for each tile
    const transformedData: TileData[] = await Promise.all(
      tiles.map(async (tile: any) => {
        const { waterStress, actionForAverage } = await fetchWaterStress(tile.id);
        
        // Extract row and col indices from tile.rowCol (format: "row_col")
        const [rowIndex, colIndex] = tile.rowCol.split('_').map(Number);

        // Calculate the blockId
        const blockId = rowIndex * numCols + colIndex + 1;

        return {
          rowCol: `B${blockId}`, // Assign blockId as "B{blockId}"
          id: tile.id,
          stressStatus: tile.stress, // Stress status from the first API
          waterStress, // Water stress from the second API
          actionForAverage, // Action derived from the second API
        };
      })
    );

    setData(transformedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  useEffect(() => {
    fetchTileData();
  }, []);

  const handleLocateClick = (rowData: TileData) => {
    console.log("Locate button clicked for Block ID StressTB:", rowData.rowCol);
    highlightBlock(rowData.rowCol); // Highlight the block on the map
  };


  const handleViewClick = (rowData: TileData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };


  // Define table columns
  const columns = [
    { label: 'Block ID', key: 'rowCol' },
    { label: 'Stress Status', key: 'stressStatus' },
    { label: 'Water Stress or Not', key: 'waterStress' },
    { label: 'Action for Average', key: 'actionForAverage' },
    {
      label: 'Locate',
      key: 'locate',
      render: (rowData: TileData) => (
        <Button onClick={(e) => {
          e.stopPropagation(); // Prevent triggering row click
          handleLocateClick(rowData);
        }} variant="contained" color="primary">
          Locate
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
        }} variant="contained" color="secondary">
          View
        </Button>
      )
    }
  ];

  return (
    <div className="history-table-container" style={{ marginTop: '30px' }}>
      <Typography variant="h4" mb={2}>Stress Analysis</Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" mr={2}>
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(128, 128, 128, 0.2)" mr={1} />
          <Typography variant="body2">Not Vulnerability to Stress</Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(255, 0, 0, 0.2)" mr={1} />
          <Typography variant="body2">Vulnerable to Stress</Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <Box width={10} height={10} borderRadius="50%" bgcolor="rgba(0, 0, 255, 0.2)" mr={1} />
          <Typography variant="body2">Vulnerable to Water Stress</Typography>
        </Box>
        
      </Box>

      <ReusableTable 
        columns={columns} 
        data={data} 
        onRowClick={handleViewClick} 
        recordsPerPage={5} 
      />

      {/* MUI Modal for showing Tile data details */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: 20, 
        }
      }}>
        <DialogTitle style={{ color: '#4CAF50', fontWeight: 'bold' }}>Tile Data Details</DialogTitle>
        <DialogContent style={{ backgroundColor: '#F1F8E9' }}>
          {selectedData ? (
            <>
              <Typography variant="h6" color="textPrimary"><strong>Block ID :</strong> {selectedData.rowCol}</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Stress Status:</strong> {selectedData.stressStatus}</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Water Stress or Not:</strong> {selectedData.waterStress}</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Action for Average:</strong> {selectedData.actionForAverage}</Typography>
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

export default StressTb;
