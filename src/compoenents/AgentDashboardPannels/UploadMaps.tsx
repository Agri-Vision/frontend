import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Task {
  id: number;
  webOdmTaskId: string;
  taskType: string;
  mapImageUrl: string | null;
  lastModifiedDate?: string;
}

const UploadMaps: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [mapFiles, setMapFiles] = useState<Record<string, File | null>>({
    rgbMap: null,
    rMap: null,
    gMap: null,
    reMap: null,
    nirMap: null,
  });
  const [uploadedPreviews, setUploadedPreviews] = useState<Record<string, string | null>>({
    rgbMap: null,
    rMap: null,
    gMap: null,
    reMap: null,
    nirMap: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/project/${id}`);
        setProjectDetails(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, mapType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const taskType = mapType.replace('Map', '').toUpperCase();
      const newFileName = `${file.name.replace(/\.[^/.]+$/, '')}_MS_${taskType}${file.name.match(/\.[^/.]+$/)?.[0] || ''}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      setMapFiles((prev) => ({
        ...prev,
        [mapType]: renamedFile,
      }));
      setUploadedPreviews((prev) => ({
        ...prev,
        [mapType]: URL.createObjectURL(renamedFile),
      }));
    }
  };

  const handleRemoveImage = (mapType: string) => {
    setMapFiles((prev) => ({
      ...prev,
      [mapType]: null,
    }));
    setUploadedPreviews((prev) => ({
      ...prev,
      [mapType]: null,
    }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(mapFiles).forEach((mapType) => {
      const file = mapFiles[mapType];
      if (file) {
        formData.append(mapType, file);
      }
    });

    try {
      const response = await axios.put(`${API_BASE_URL}/project/maps/${id}`, formData);
      console.log('Upload successful:', response.data);
      setMessage({ type: 'success', text: 'Maps uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading maps:', error);
      setMessage({ type: 'error', text: 'Failed to upload maps. Please try again.' });
    }
  };

  if (loading) {
    return <Typography>Loading project details...</Typography>;
  }

  if (!projectDetails) {
    return <Typography variant="body1" color="error">Failed to load project details.</Typography>;
  }

  const { webOdmProjectId, taskList, agent } = projectDetails;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload Maps for Project: {projectDetails.projectName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        WebODM Project ID: <strong>{webOdmProjectId || 'Not Available'}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Project Status: <strong>{projectDetails.status}</strong>
      </Typography>
      {agent ? (
        <Typography variant="body1" gutterBottom>
          Assigned to: <strong>{agent.firstName} {agent.lastName}</strong>
        </Typography>
      ) : (
        <Typography variant="body1" color="error" gutterBottom>
          Agent information is not available.
        </Typography>
      )}

      {message && (
        <Alert severity={message.type} sx={{ mt: 2 }}>
          {message.text}
        </Alert>
      )}

      {!taskList || taskList.length === 0 ? (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          WebODM project not created for this project.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {taskList.map((task: Task) => (
            <Grid item xs={12} md={6} key={task.webOdmTaskId}>
              <Paper sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {task.taskType} Task ID: {task.webOdmTaskId}
                </Typography>
                {task.lastModifiedDate && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 2 }}>
                    Last Modified: {new Date(task.lastModifiedDate).toLocaleString()}
                  </Typography>
                )}

                {uploadedPreviews[`${task.taskType.toLowerCase()}Map`] ? (
                  <Box sx={{ position: 'relative', marginTop: 2, height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src={uploadedPreviews[`${task.taskType.toLowerCase()}Map`] || ''}
                      alt={`${task.taskType} preview`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                      onClick={() => handleRemoveImage(`${task.taskType.toLowerCase()}Map`)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    No image uploaded yet.
                  </Typography>
                )}

                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginTop: 2, borderRadius: '8px', padding: '10px' }}
                >
                  Upload {task.taskType} Map
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, `${task.taskType.toLowerCase()}Map`)}
                  />
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ marginTop: 3, width: '100%', padding: '12px', borderRadius: '8px' }}
        disabled={!taskList || taskList.length === 0}
      >
        Upload All Maps
      </Button>
    </Box>
  );
};

export default UploadMaps;
