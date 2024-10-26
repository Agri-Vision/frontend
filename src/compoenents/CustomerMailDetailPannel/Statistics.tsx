import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MapIcon from '@mui/icons-material/Map';
import SpaIcon from '@mui/icons-material/Spa';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useParams } from 'react-router-dom';
import GrassIcon from '@mui/icons-material/Grass';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

interface Metric {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
}

const Statistics: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [metrics, setMetrics] = useState({
        coveredArea: { value: '1,689', change: '8.5% Up from last Project', positive: true },
        estimatedYield: { value: '0', change: '1.3% Up from last Project', positive: true },
        IOTDevices: { value: '0', change: '0 Device', positive: true },
        validPeriod: { value: '0', change: 'Days Remaining', positive: false },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch project details
                const response = await fetch(`${API_BASE_URL}/project/${id}`);
                const data = await response.json();

                // Extract the IoT device count
                const iotDeviceCount = data.iotDeviceList.length;

                // Calculate the remaining days for the valid period (30-day countdown)
                const createdDate = new Date(data.createdDate);
                const currentDate = new Date();
                const diffTime = 30 - Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

                // Fetch yield from the specified endpoint
                const yieldResponse = await fetch(`${API_BASE_URL}/project/total/yield/${id}`);
                const yieldData = await yieldResponse.json();
                const estimatedYield = yieldData.result;

                // Update metrics with API data
                setMetrics({
                    coveredArea: { value: '1,689', change: '8.5% Up from last Project', positive: true }, // Example value
                    estimatedYield: { 
                        value: estimatedYield, 
                        change: '1.3% Up from last Project', 
                        positive: true 
                    },
                    IOTDevices: { 
                        value: `${iotDeviceCount}`, 
                        change: `${iotDeviceCount} Device${iotDeviceCount > 1 ? 's' : ''}`, 
                        positive: iotDeviceCount > 0 
                    },
                    validPeriod: { 
                        value: `${diffTime > 0 ? diffTime : 0}`, 
                        change: 'Days Remaining', 
                        positive: diffTime > 28
                    },
                });
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* Covered Area Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.coveredArea.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <MapIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.coveredArea.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Covered Area (m²)
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.coveredArea.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.coveredArea.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.coveredArea.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Estimated Yield Card */}
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
                                Estimated Yield (Kg)
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.estimatedYield.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.estimatedYield.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.estimatedYield.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Active IOT Devices Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.IOTDevices.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <PodcastsIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.IOTDevices.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Active IOT Devices
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.IOTDevices.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.IOTDevices.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.IOTDevices.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Valid Period Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.validPeriod.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <PendingActionsIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.validPeriod.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Valid Period
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.validPeriod.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.validPeriod.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.validPeriod.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>


                {/* Stress Estimation Card */}
                <Grid item xs={12} sm={6} md={3}>
                                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                                        <Avatar sx={{ bgcolor: metrics.validPeriod.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                                            <GrassIcon />
                                        </Avatar>
                                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                                {metrics.validPeriod.value}
                                            </Typography>
                                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                                Estimated Stress
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: metrics.validPeriod.positive ? 'green' : 'red', marginTop: 1 }}>
                                                {metrics.validPeriod.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.validPeriod.change}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>

                                
                {/* Disease Estimation Card */}
                <Grid item xs={12} sm={6} md={3}>
                                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                                        <Avatar sx={{ bgcolor: metrics.validPeriod.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                                            <CoronavirusIcon />
                                        </Avatar>
                                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                                {metrics.validPeriod.value}
                                            </Typography>
                                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                                Estimated Disease
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: metrics.validPeriod.positive ? 'green' : 'red', marginTop: 1 }}>
                                                {metrics.validPeriod.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.validPeriod.change}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>


            </Grid>
        </Box>
    );
};

export default Statistics;
