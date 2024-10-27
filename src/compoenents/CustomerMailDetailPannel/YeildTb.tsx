import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { useMapHighlightContext } from '../MapHighlightContext';

interface TileData {
  rowCol: string;
  id: number;
  yieldEstimation: string;
  conditionStatus: string;
}

const YeildTb: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState<TileData[]>([]);
  const [selectedData, setSelectedData] = useState<TileData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { highlightedBlock, highlightBlock, removeHighlight } = useMapHighlightContext();

  const TILE_API_URL = `${API_BASE_URL}/project/tiles/by/project/${id}`;
  const PREDICTION_API_URL = (taskId: number) => `${API_BASE_URL}/prediction/yield/${taskId}/1`;

  // Fetch tile data
const fetchTileData = async () => {
  try {
    const tileResponse = await fetch(TILE_API_URL);
    if (!tileResponse.ok) {
      throw new Error('Failed to fetch tiles');
    }
    const tiles = await tileResponse.json();

    // Calculate the number of columns dynamically from the tile data if not defined
    const maxColIndex = Math.max(...tiles.map((tile: any) => parseInt(tile.rowCol.split('_')[1])));
    const numCols = maxColIndex + 1; // Assuming column indices start at 0

    // For each tile, fetch the possible condition from the prediction API and calculate blockId
    const tileDataWithPrediction = await Promise.all(
      tiles.map(async (tile: any) => {
        const predictionResponse = await fetch(PREDICTION_API_URL(tile.id));
        if (!predictionResponse.ok) {
          throw new Error(`Failed to fetch prediction for tile ID: ${tile.id}`);
        }
        const predictionResult = await predictionResponse.json();

        // Extract row and column indices from tile.rowCol (format: "row_col")
        const [rowIndex, colIndex] = tile.rowCol.split('_').map(Number);

        // Calculate the blockId
        const blockId = rowIndex * numCols + colIndex + 1;

        return {
          id: `B${blockId}`, // Set blockId as "B{blockId}"
          yieldEstimation: tile.yield, // Yield estimation from API response
          conditionStatus: predictionResult.result, // Prediction result from second API
        };
      })
    );

    setData(tileDataWithPrediction);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  useEffect(() => {
    fetchTileData();
  }, []);

  const handleViewClick = (rowData: TileData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };

  const handleLocateClick = (rowData: TileData) => {
    if (highlightedBlock === rowData.id) {
      console.log("Unlocating Block ID:", rowData.id);
      removeHighlight();
    } else {
      console.log("Locating Block ID:", rowData.id);
      highlightBlock(rowData.id);
    }
  };

  // Define table columns
  const columns = [
    { label: 'Block ID ', key: 'id' },
    { label: 'Yield Estimation (Kg)', key: 'yieldEstimation' },
    { label: 'Possible Condition', key: 'conditionStatus' },
    {
      label: 'Locate',
      key: 'locate',
      render: (rowData: TileData) => (
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering row click
            handleLocateClick(rowData);
          }} 
          variant="contained" 
          color={highlightedBlock === rowData.id ? "error" : "primary"}
          sx={{
            backgroundColor: highlightedBlock === rowData.id ? 'rgba(6,26,41,255)' : undefined,
            '&:hover': {
              backgroundColor: highlightedBlock === rowData.id ? 'primary' : undefined,
            },
            fontFamily: 'Nunito, Poppins, sans-serif',
            padding: '4px 8px',
            fontSize: '0.85rem',
            minWidth: '90px',
            height: '32px'
          }}
        >
          {highlightedBlock === rowData.id ? 'Unlocate' : 'Locate'}
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
    <div className="history-table-container">
      <h2>Yield Analysis</h2>
      <ReusableTable columns={columns} data={data} onRowClick={handleViewClick} recordsPerPage={5} />

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
              <Typography variant="h6" color="textPrimary"><strong>Block ID :</strong> {selectedData.id}</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Yield Estimation:</strong> {selectedData.yieldEstimation} Kg</Typography>
              <Typography variant="h6" color="textPrimary"><strong>Possible Condition:</strong> {selectedData.conditionStatus}</Typography>
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

export default YeildTb;
