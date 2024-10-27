import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Box,
  Typography
} from '@mui/material';

interface Column {
  label: string;
  key: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  recordsPerPage?: number; 
  onRowClick?: (rowData: any) => void;
}

const ReusableTable: React.FC<TableProps> = ({ columns, data, recordsPerPage = 5, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentData = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Helper function to extract percentage from "Disease Vulnerability"
  const extractPercentage = (result: string) => {
    const match = result.match(/(\d+(\.\d+)?)%/);
    return match ? parseFloat(match[1]) : null;
  };

  // Determine colors for each column's specific conditions
  const getBoxColor = (columnKey: string, value: string) => {
    if (columnKey === 'diseaseVulnerability') {
      const percentage = extractPercentage(value);
      if (percentage !== null) {
        if (percentage < 25) return 'rgba(255, 0, 0, 0.2)'; // Red for <25%
        if (percentage >= 25 && percentage < 50) return 'rgba(255, 165, 0, 0.2)'; // Orange for 25-50%
        if (percentage >= 50 && percentage < 75) return 'rgba(255, 255, 0, 0.2)'; // Yellow for 50-75%
        if (percentage >= 75) return 'rgba(0, 128, 0, 0.2)'; // Green for 75-100%
      }
      return 'transparent';
    }
    
    if (columnKey === 'stressStatus') {
      return value === 'yes' ? 'rgba(255, 0, 0, 0.2)' : 'rgba(128, 128, 128, 0.2)'; // Red if 'yes', gray otherwise
    }
    
    if (columnKey === 'waterStress') {
      return value === 'Possible Water Stress Detected' ? 'rgba(0, 0, 255, 0.2)' : 'rgba(128, 128, 128, 0.2)'; // Blue if detected, gray otherwise
    }

    return 'transparent';
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    textTransform: 'uppercase',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  textTransform: 'uppercase',
                }}
              >
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {(column.key === 'diseaseVulnerability' || column.key === 'stressStatus' || column.key === 'waterStress') ? (
                      <Box
                        sx={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: getBoxColor(column.key, row[column.key]),
                          borderRadius: '8px',
                        }}
                      >
                        <Typography variant="body2">{row[column.key]}</Typography>
                      </Box>
                    ) : (
                      row[column.key]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default ReusableTable;
