import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface IoTDevice {
  id: string;
  currentLatitude: string;
  currentLongitude: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the project ID from URL
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [iotDevices, setIoTDevices] = useState<IoTDevice[]>([{ id: '', currentLatitude: '', currentLongitude: '' }]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [webOdmProjectId, setWebOdmProjectId] = useState<string>('');
  const [taskList, setTaskList] = useState<any[]>([]);

  // Fetch project details from the backend
  useEffect(() => {
    const fetchProjectDetails = async () => {
     
      try {
        const response = await axios.get(`http://localhost:8080/project/${id}`);
        setProjectDetails(response.data);
        setWebOdmProjectId(response.data.webOdmProjectId || '');
        setIoTDevices(response.data.iotDeviceList || []);
        setTaskList(response.data.taskList || []);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const categorizeImages = (images: File[]) => {
    const categorizedImages: { [key: string]: File[] } = {
      RGB: [],
      R: [],
      NIR: [],
      RE: [],
      G: []
    };

    images.forEach(image => {
      const fileName = image.name.toUpperCase();
      console.log('Image name for categorization:', fileName);

      if (fileName.endsWith('_D.JPG')) {
        categorizedImages.RGB.push(image);
      } else if (fileName.endsWith('_MS_R.TIF')) {
        categorizedImages.R.push(image);
      } else if (fileName.endsWith('_MS_NIR.TIF')) {
        categorizedImages.NIR.push(image);
      } else if (fileName.endsWith('_MS_RE.TIF')) {
        categorizedImages.RE.push(image);
      } else if (fileName.endsWith('_MS_G.TIF')) {
        categorizedImages.G.push(image);
      }
    });

    console.log('Categorized Images:', categorizedImages);
    return categorizedImages;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      console.log('Uploaded images:', files.map(file => file.name));
      setUploadedImages(prevImages => [...prevImages, ...files]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    console.log('Dropped images:', files.map(file => file.name));
    setUploadedImages(prevImages => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const handleAddIoTDevice = () => {
    setIoTDevices([...iotDevices, { id: '', currentLatitude: '', currentLongitude: '' }]);
  };

  const handleRemoveIoTDevice = (index: number) => {
    if (index > 0) {
      const newDevices = [...iotDevices];
      newDevices.splice(index, 1);
      setIoTDevices(newDevices);
    }
  };

  const handleIoTDeviceChange = (index: number, field: keyof IoTDevice, value: string) => {
    const updatedDevices = [...iotDevices];
    updatedDevices[index][field] = value;
    setIoTDevices(updatedDevices);
  };

  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(event.target.checked);
  };

  const handleSubmit = async () => {
    if (!isConfirmed) {
      setMessage({ type: 'error', text: 'Please confirm the details before submitting.' });
      return;
    }

    try {
      // Step 1: Obtain Authorization Token
      const tokenResponse = await axios.post('http://192.168.8.101:8000/api/token-auth/', {
        username: 'DinukaKariyawasam',
        password: 'test'
      });
      const token = tokenResponse.data.token;

      // Step 2: Create a New Project in WebODM
      const projectResponse = await axios.post('http://192.168.8.101:8000/api/projects/', {
        name: projectDetails.projectName
      }, {
        headers: {
          Authorization: `JWT ${token}`
        }
      });
      const newWebOdmProjectId = projectResponse.data.id;
      setWebOdmProjectId(newWebOdmProjectId);

      // Step 3: Categorize Images by Bands
      const categorizedImages = categorizeImages(uploadedImages);

      // Step 4: Create Tasks for Each Band of Images
      const createdTasks: any[] = [];

      const createTaskForBand = async (bandName: string, images: File[]) => {
        if (images.length < 3) {
          console.warn(`Not enough images for band: ${bandName}`);
          return;
        }

        const formData = new FormData();
        images.forEach((image) => {
          formData.append('images', image, image.name);
        });

        const options = JSON.stringify([
          { "name": "orthophoto-resolution", "value": 2.0 },
          { "name": "auto-boundary", "value": true },
          { "name": "dsm", "value": true },
          { "name": "pc-quality", "value": "high" },
          { "name": "dem-resolution", "value": 2.0 }
        ]);

        formData.append('options', options);

        try {
          const taskResponse = await axios.post(`http://192.168.8.101:8000/api/projects/${newWebOdmProjectId}/tasks/`, formData, {
            headers: {
              Authorization: `JWT ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(`Task created for band ${bandName}:`, taskResponse.data);
          createdTasks.push({
            // id: taskResponse.data.id,
            webOdmTaskId: taskResponse.data.id,
            taskType: bandName,
            // mapImage: taskResponse.data.mapImage, // Assuming mapImage is part of the response
          });
        } catch (taskError: any) {
          console.error(`Error creating task for band ${bandName}:`, taskError.response ? taskError.response.data : taskError.message);
          throw new Error(`Error creating task for band ${bandName}`);
        }
      };

      await Promise.all([
        createTaskForBand('RGB', categorizedImages.RGB),
        createTaskForBand('R', categorizedImages.R),
        createTaskForBand('NIR', categorizedImages.NIR),
        createTaskForBand('RE', categorizedImages.RE),
        createTaskForBand('G', categorizedImages.G),
      ]);

      setTaskList(createdTasks);
      setMessage({ type: 'success', text: 'Project and tasks created successfully!' });

      // Automatically update the project after successful submission
    await handleUpdateProject();
    } catch (error: any) {
      console.error('Error creating project or tasks:', error.message);
      setMessage({ type: 'error', text: 'Failed to create project or tasks. Please try again.' });
    }
  };

  const handleUpdateProject = async () => {
  const updateData = {
    ...projectDetails,
    webOdmProjectId,
    iotDeviceList: iotDevices.map((device) => ({
      ...device,
      deviceCode: `IOT-SENSOR-${device.id}`
    })),
    taskList: taskList
  };

  try {
    const response = await axios.put('http://192.168.8.101:8080/project', updateData);
    console.log('Project updated:', response.data);
    setMessage({ type: 'success', text: 'Project updated successfully!' });
  } catch (error) {
    console.error('Error updating project:', error);
    setMessage({ type: 'error', text: 'Failed to update project. Please try again.' });
  }
};

  return (
    <Box sx={{ padding: 3 }}>
      {projectDetails ? (
        <>
          <Typography variant="h4" gutterBottom>
            {projectDetails.projectName}
          </Typography>

          {message && (
            <Typography variant="body1" sx={{ color: message.type === 'success' ? 'green' : 'red', marginBottom: 2 }}>
              {message.text}
            </Typography>
          )}

          <Grid container spacing={3}>
            {/* Project Info */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h6">Assigned Agent: {projectDetails.agent.firstName} {projectDetails.agent.lastName}</Typography>
                <Typography variant="body1">
                  Assigned Date: {new Date(projectDetails.createdDate).toLocaleString()}
                </Typography>
                <Typography variant="body1">Status: {projectDetails.status}</Typography>
              </Paper>
            </Grid>

            {/* Project Images */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>Plantation Images</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {projectDetails.plantation?.plantationImgUrl && (
                    <img
                      src={projectDetails.plantation.plantationImgUrl}
                      alt={projectDetails.plantation.plantationName}
                      style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Box
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                sx={{
                  border: '2px dashed grey',
                  padding: 3,
                  textAlign: 'center',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <Typography variant="body1">Drag & Drop to upload images or</Typography>
                <Button variant="contained" component="label">
                  Upload
                  <input hidden type="file" multiple onChange={handleImageUpload} />
                </Button>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: 2 }}>
                  {uploadedImages.map((file, index) => (
                    <Box key={index} sx={{ position: 'relative', width: '150px', height: '100px' }}>
                      <img src={URL.createObjectURL(file)} alt={`Uploaded ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* IoT Devices */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>IoT Devices</Typography>
              {iotDevices.map((device, index) => (
                <Grid container spacing={2} key={index} sx={{ marginBottom: 2, alignItems: 'center', maxWidth: '600px' }}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Device ID"
                      value={device.id}
                      onChange={(e) => handleIoTDeviceChange(index, 'id', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Latitude"
                      value={device.currentLatitude}
                      onChange={(e) => handleIoTDeviceChange(index, 'currentLatitude', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Longitude"
                      value={device.currentLongitude}
                      onChange={(e) => handleIoTDeviceChange(index, 'currentLongitude', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    {index > 0 && (
                      <IconButton color="error" onClick={() => handleRemoveIoTDevice(index)} sx={{ marginTop: '8px' }}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Button variant="outlined" onClick={handleAddIoTDevice}>
                Add IoT Device
              </Button>
            </Grid>

            {/* Confirmation and Submit */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={isConfirmed} onChange={handleConfirmChange} />}
                label="I confirm that all the details are correct"
              />
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isConfirmed}>
                Submit
              </Button>
              {/* <Button variant="contained" color="secondary" onClick={handleUpdateProject} disabled={!isConfirmed} sx={{ marginLeft: 2 }}>
                Update Project
              </Button> */}
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Loading project details...
        </Typography>
      )}
    </Box>
  );
};

export default ProjectDetail;
