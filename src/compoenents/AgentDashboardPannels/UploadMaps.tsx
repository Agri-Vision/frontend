import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
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
  const { projectId } = useParams<{ projectId: string }>();
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

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/project/${projectId}`);
        setProjectDetails(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, mapType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setMapFiles((prev) => ({
        ...prev,
        [mapType]: file,
      }));
      setUploadedPreviews((prev) => ({
        ...prev,
        [mapType]: URL.createObjectURL(file),
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
      const response = await axios.put(`http://localhost:8080/project/maps/${projectId}`, formData);
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading maps:', error);
    }
  };

  if (!projectDetails) {
    return <Typography>Loading project details...</Typography>;
  }

  const { webOdmProjectId, taskList, agent } = projectDetails;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upload Maps for Project: {projectDetails.projectName}
      </Typography>
      <Typography variant="body1">
        WebODM Project ID: {webOdmProjectId || 'Not Available'}
      </Typography>
      <Typography variant="body1">
        Project Status: {projectDetails.status}
      </Typography>
      {agent ? (
        <Typography variant="body1" gutterBottom>
          Assigned to: {agent.firstName} {agent.lastName}
        </Typography>
      ) : (
        <Typography variant="body1" color="error" gutterBottom>
          Agent information is not available.
        </Typography>
      )}

      {!taskList || taskList.length === 0 ? (
        <Typography variant="body1" color="error">
          WebODM project not created for this project.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {taskList.map((task: Task) => (
            <Grid item xs={12} md={6} key={task.webOdmTaskId}>
              <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">
                  {task.taskType} Task ID: {task.webOdmTaskId}
                </Typography>
                {task.lastModifiedDate && (
                  <Typography variant="body2">
                    Last Modified: {new Date(task.lastModifiedDate).toLocaleString()}
                  </Typography>
                )}

                {uploadedPreviews[`${task.taskType.toLowerCase()}Map`] ? (
                  <Box sx={{ position: 'relative', marginTop: 2, height: '200px' }}>
                    <img
                      src={uploadedPreviews[`${task.taskType.toLowerCase()}Map`] || ''}
                      alt={`${task.taskType} preview`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain', // Ensure the image is fully visible within the container
                      }}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => handleRemoveImage(`${task.taskType.toLowerCase()}Map`)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No image uploaded yet.
                  </Typography>
                )}

                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginTop: 2, width: '100%' }} // Full width button
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
        sx={{ marginTop: 3, width: '100%' }} // Full width button for consistency
        disabled={!taskList || taskList.length === 0}
      >
        Upload All Maps
      </Button>
    </Box>
  );
};

export default UploadMaps;
