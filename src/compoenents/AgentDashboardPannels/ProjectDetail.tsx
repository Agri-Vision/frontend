import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

interface IoTDevice {
  id: string;
  latitude: string;
  longitude: string;
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Retrieve the project ID from URL
  const [projectDetails, setProjectDetails] = useState({
    name: 'Sample Plantation',
    owner: 'John Doe',
    assignedDate: '10 Juli 2022',
    instructions: 'Follow the protocol strictly and monitor daily.',
    images: ['/path/to/image1.jpg', '/path/to/image2.jpg'], // Example images
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [iotDevices, setIoTDevices] = useState<IoTDevice[]>([{ id: '', latitude: '', longitude: '' }]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedImages([...uploadedImages, ...files]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedImages([...uploadedImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const handleAddIoTDevice = () => {
    setIoTDevices([...iotDevices, { id: '', latitude: '', longitude: '' }]);
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

  const handleSubmit = () => {
    if (!isConfirmed) {
      alert('Please confirm the details before submitting.');
      return;
    }
    // Perform submit actions here
    console.log('Submitting project details:', {
      uploadedImages,
      iotDevices,
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
         {projectDetails.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Project Info */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">Owner: {projectDetails.owner}</Typography>
            <Typography variant="body1">Assigned Date: {projectDetails.assignedDate}</Typography>
            <Typography variant="body1">Instructions: {projectDetails.instructions}</Typography>
          </Paper>
        </Grid>

        {/* Project Images */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Plantation Images</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {projectDetails.images.map((img, index) => (
                <img key={index} src={img} alt={`Plantation ${index}`} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
              ))}
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
            <Grid container spacing={2} key={index} sx={{ marginBottom: 2, alignItems: 'center', maxWidth: '1000px' }}>
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
                  value={device.latitude}
                  onChange={(e) => handleIoTDeviceChange(index, 'latitude', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Longitude"
                  value={device.longitude}
                  onChange={(e) => handleIoTDeviceChange(index, 'longitude', e.target.value)}
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetail;
