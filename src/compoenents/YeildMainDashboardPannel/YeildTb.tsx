import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';

interface TileData {
  id: number;
  yieldEstimation: string;
  conditionStatus: string;
}

const YeildTb: React.FC = () => {
  const [data, setData] = useState<TileData[]>([]);
  const [selectedData, setSelectedData] = useState<TileData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const TILE_API_URL = 'http://localhost:8080/project/tiles';
  const PREDICTION_API_URL = (taskId: number) => `http://localhost:8080/prediction/yield/${taskId}/1`;

  // Fetch tile data
  const fetchTileData = async () => {
    try {
      const tileResponse = await fetch(TILE_API_URL);
      if (!tileResponse.ok) {
        throw new Error('Failed to fetch tiles');
      }
      const tiles = await tileResponse.json();

      // For each tile, fetch the possible condition from the prediction API
      const tileDataWithPrediction = await Promise.all(
        tiles.map(async (tile: any) => {
          const predictionResponse = await fetch(PREDICTION_API_URL(tile.id));
          if (!predictionResponse.ok) {
            throw new Error(`Failed to fetch prediction for tile ID: ${tile.id}`);
          }
          const predictionResult = await predictionResponse.json();

          return {
            id: tile.id,
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

  const handleRowClick = (rowData: TileData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };

  // Define table columns
  const columns = [
    { label: 'Tile ID', key: 'id' },
    { label: 'Yield Estimation', key: 'yieldEstimation' },
    { label: 'Possible Condition', key: 'conditionStatus' },
  ];

  return (
    <div className="history-table-container">
      <h2>Yield Analysis</h2>
      <ReusableTable columns={columns} data={data} onRowClick={handleRowClick} recordsPerPage={5} />

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
              <Typography variant="h6" color="textPrimary"><strong>Tile ID:</strong> {selectedData.id}</Typography>
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
