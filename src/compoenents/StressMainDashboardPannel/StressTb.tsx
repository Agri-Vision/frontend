import React, { useEffect, useState } from 'react';
import ReusableTable from '../CustomerMailDetailPannel/ReusableTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';

interface TileData {
  id: number;
  stressStatus: string;
  waterStress: string;
  actionForAverage: string;
}

const StressTb: React.FC = () => {
  const [data, setData] = useState<TileData[]>([]);
  const [selectedData, setSelectedData] = useState<TileData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const TILE_API_URL = 'http://localhost:8080/project/tiles';
  const PREDICTION_API_URL = (tileId: number) => `http://localhost:8080/prediction/stress/${tileId}`;

  // Fetch Water Stress information using tile ID
  const fetchWaterStress = async (tileId: number) => {
    try {
      const response = await fetch(PREDICTION_API_URL(tileId));
      if (!response.ok) {
        throw new Error(`Failed to fetch water stress for tile ID: ${tileId}`);
      }
      const result = await response.json();
      return result.result || 'Unknown'; // Assuming 'result' contains the water stress information
    } catch (error) {
      console.error('Error fetching water stress:', error);
      return 'Unknown'; // Return a default value in case of error
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

      // Transform the tile data and fetch water stress for each tile
      const transformedData: TileData[] = await Promise.all(
        tiles.map(async (tile: any) => {
          const waterStress = await fetchWaterStress(tile.id);
          return {
            id: tile.id,
            stressStatus: tile.stress, // Stress status from the first API
            waterStress: waterStress,  // Water stress from the second API
            actionForAverage: waterStress, // Assuming the action is based on water stress
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

  const handleRowClick = (rowData: TileData) => {
    setSelectedData(rowData);
    setShowModal(true);
  };

  // Define table columns
  const columns = [
    { label: 'Block ID', key: 'id' },
    { label: 'Stress Status', key: 'stressStatus' },
    { label: 'Water Stress or Not', key: 'waterStress' },
    { label: 'Action for Average', key: 'actionForAverage' },
  ];

  return (
    <div className="history-table-container">
      <h2>Stress Analysis</h2>
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
              <Typography variant="h6" color="textPrimary"><strong>Block ID:</strong> {selectedData.id}</Typography>
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
