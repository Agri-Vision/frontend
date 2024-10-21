import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Plantation {
    plantationName: string;
    address: string;
    contactNo: string;
    plantationImg: string | null; // Store the uploaded image filename
    currentLatitude: string;
    currentLongitude: string;
}

const CreateOrganization: React.FC = () => {
    const [orgCode, setOrgCode] = useState('');
    const [orgName, setOrgName] = useState('');
    const [district, setDistrict] = useState('');
    const [orgImage, setOrgImage] = useState<string | null>(null);
    const [plantations, setPlantations] = useState<Plantation[]>([
        {
            plantationName: '',
            address: '',
            contactNo: '',
            plantationImg: null,
            currentLatitude: '',
            currentLongitude: '',
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddPlantation = () => {
        setPlantations([
            ...plantations,
            {
                plantationName: '',
                address: '',
                contactNo: '',
                plantationImg: null,
                currentLatitude: '',
                currentLongitude: '',
            },
        ]);
    };

    const handleRemovePlantation = (index: number) => {
        if (plantations.length > 1) {
            const newPlantations = [...plantations];
            newPlantations.splice(index, 1);
            setPlantations(newPlantations);
        }
    };

    const handlePlantationChange = (index: number, field: keyof Plantation, value: string) => {
        const updatedPlantations = [...plantations];
        updatedPlantations[index][field] = value;
        setPlantations(updatedPlantations);
    };

    const handleImageUpload = async (base64: string): Promise<string | null> => {
        try {
            const response = await axios.post('http://localhost:8080/utility/file/upload', base64, {
                headers: {
                    'Content-Type': 'text/plain', // Send raw base64 as plain text
                },
            });
            return response.data.result;
        } catch (error) {
            setError('Failed to upload image');
            console.error('Image upload error:', error);
            return null;
        }
    };

    const handleOrgImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const uploadedFileName = await handleImageUpload(base64);
                if (uploadedFileName) {
                    setOrgImage(uploadedFileName);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePlantationImageChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const uploadedFileName = await handleImageUpload(base64);
                if (uploadedFileName) {
                    handlePlantationChange(index, 'plantationImg', uploadedFileName);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!orgCode || !orgName || !district || !orgImage || plantations.some(p => !p.plantationName || !p.address || !p.contactNo || !p.currentLatitude || !p.currentLongitude || !p.plantationImg)) {
            setError('Please fill in all required fields');
            return;
        }

        const organizationData = {
            orgCode,
            orgName,
            district,
            orgImage,
            plantationList: plantations.map((plantation) => ({
                plantationName: plantation.plantationName,
                address: plantation.address,
                contactNo: plantation.contactNo,
                plantationImg: plantation.plantationImg,
                currentLatitude: plantation.currentLatitude,
                currentLongitude: plantation.currentLongitude,
            })),
        };

        try {
            setLoading(true);
            await axios.post('http://localhost:8080/org', organizationData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setSuccessMessage('Organization created successfully!');
            // Clear the form fields after successful submission
            setOrgCode('');
            setOrgName('');
            setDistrict('');
            setOrgImage(null);
            setPlantations([
                {
                    plantationName: '',
                    address: '',
                    contactNo: '',
                    plantationImg: null,
                    currentLatitude: '',
                    currentLongitude: '',
                },
            ]);
        } catch (error) {
            setError('An error occurred while creating the organization');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: '800px', margin: '0 auto' }}>
            <Typography 
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontFamily: 'Poppins , sans-serif', fontWeight: 'bold', color: '#5D6965' }}
            >
                Create New Organization
            </Typography>

            {error && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}

            {successMessage && (
                <Typography color="success" sx={{ marginBottom: 2 }}>
                    {successMessage}
                </Typography>
            )}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Organization Code"
                            variant="outlined"
                            value={orgCode}
                            onChange={(e) => setOrgCode(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Organization Name"
                            variant="outlined"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="District"
                            variant="outlined"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component="label">
                            Upload Organization Image
                            <input hidden type="file" accept="image/*" onChange={handleOrgImageChange} />
                        </Button>
                        {orgImage && (
                            <Typography sx={{ marginTop: 1 }}>
                                Image uploaded successfully: {orgImage}
                            </Typography>
                        )}
                    </Grid>

                    {plantations.map((plantation, index) => (
                        <Grid item xs={12} key={index}>
                            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                                <Typography variant="h6">Plantation {index + 1}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Plantation Name"
                                            variant="outlined"
                                            value={plantation.plantationName}
                                            onChange={(e) => handlePlantationChange(index, 'plantationName', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            variant="outlined"
                                            value={plantation.address}
                                            onChange={(e) => handlePlantationChange(index, 'address', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Number"
                                            variant="outlined"
                                            value={plantation.contactNo}
                                            onChange={(e) => handlePlantationChange(index, 'contactNo', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" component="label">
                                            Upload Plantation Image
                                            <input hidden type="file" accept="image/*" onChange={(e) => handlePlantationImageChange(index, e)} />
                                        </Button>
                                        {plantation.plantationImg && (
                                            <Typography sx={{ marginTop: 1 }}>
                                                Image uploaded successfully: {plantation.plantationImg}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Latitude"
                                            variant="outlined"
                                            value={plantation.currentLatitude}
                                            onChange={(e) => handlePlantationChange(index, 'currentLatitude', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Longitude"
                                            variant="outlined"
                                            value={plantation.currentLongitude}
                                            onChange={(e) => handlePlantationChange(index, 'currentLongitude', e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                        {plantations.length > 1 && (
                                            <IconButton color="error" onClick={() => handleRemovePlantation(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={handleAddPlantation}>
                            Add Another Plantation
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Create Organization'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateOrganization;
