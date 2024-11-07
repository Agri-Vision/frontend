import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import { useParams } from 'react-router-dom';

const Statistics: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [metrics, setMetrics] = useState({
        coveredArea: { value: '0', positive: true },
        estimatedYield: { value: '0', positive: true },
        IOTDevices: { value: '0', positive: true },
        validPeriod: { value: '0',positive: true },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/project/plantation/2`);
                const data = await response.json();

                // Extract the necessary counts
                const totalEstates = data.length; // Total number of estates
                const pendingEstates = data.filter((item: any) => item.status === 'PENDING').length;
                const newEstates = data.filter((item: any) => item.status === 'NEW').length;
                const completedEstates = data.filter((item: any) => item.status === 'COMPLETED').length;

              

                // Update metrics with API data
                setMetrics({
                    coveredArea: {
                        value: `${totalEstates}`,
                        positive: totalEstates > 0
                    },
                    estimatedYield: {
                        value: `${newEstates}`,
                        positive: newEstates > 0
                    },
                    IOTDevices: {
                        value: `${pendingEstates}`,
                        positive: pendingEstates > 0
                    },
                    validPeriod: {
                        value: `${completedEstates}`,
                        positive: completedEstates > 0
                    },
                });
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchData();
    }, [id, API_BASE_URL]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* Total Estates Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.coveredArea.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <SpaIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.coveredArea.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Total Estates
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* New Estates Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.estimatedYield.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <SpaIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.estimatedYield.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                New Estates
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Pending Estates Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.IOTDevices.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <SpaIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.IOTDevices.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Pending Estates
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Completed Estates Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.validPeriod.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <SpaIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.validPeriod.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Completed Estates
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;
