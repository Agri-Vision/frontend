import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MapIcon from '@mui/icons-material/Map';
import SpaIcon from '@mui/icons-material/Spa';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GrassIcon from '@mui/icons-material/Grass';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { useParams } from 'react-router-dom';
import { useButtonContext } from '../ButtonContext'; // Import the ButtonContext

const Statistics: React.FC = () => {
    const { isYieldActive, isStressActive, isDiseaseActive } = useButtonContext(); // Get the states from context
    const { id } = useParams<{ id: string }>();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const WEBODM_URL = import.meta.env.VITE_WEBODM_URL;
    const [metrics, setMetrics] = useState({

        coveredArea: { value: '0', change: '8.5% Up from last Project', positive: true },
        estimatedYield: { value: '0', change: '1.3% Up from last Project', positive: true },
        IOTDevices: { value: '0', change: '0 Device', positive: true },
        validPeriod: { value: '0', change: 'Days Remaining', positive: false },
        estimatedStress: { value: '0', change: 'Compared to last Record', positive: true },
        estimatedDisease: { value: '0', change: 'Compared to last Record', positive: true },

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch project details
                const response = await fetch(`${API_BASE_URL}/project/${id}`);
                const data = await response.json();

                const webOdmProjectId = data.webOdmProjectId;
                const webOdmTaskId = data.taskList?.[0]?.webOdmTaskId;

                // Extract the IoT device count
                const iotDeviceCount = data.iotDeviceList.length;

                // Calculate the remaining days for the valid period (30-day countdown)
                const createdDate = new Date(data.createdDate);
                const currentDate = new Date();
                const diffTime = 30 - Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

                // Fetch area data from WebODM
                let areaValue = '0';
                try {
                    if (webOdmProjectId && webOdmTaskId) {
                        const areaResponse = await fetch(`${WEBODM_URL}/api/projects/${webOdmProjectId}/tasks/${webOdmTaskId}`);
                        if (!areaResponse.ok) {
                            throw new Error('Failed to fetch area data');
                        }
                        const areaData = await areaResponse.json();
                        areaValue = areaData.statistics?.area?.toFixed(2) || '0'; // Round to two decimal places
                    }
                } catch (error) {
                    console.error('Error fetching area data:', error);
                }

                // Fetch yield from the specified endpoint
                let estimatedYield = '0';
                try {
                    const yieldResponse = await fetch(`${API_BASE_URL}/project/total/yield/${id}`);
                    if (!yieldResponse.ok) {
                        throw new Error('Failed to fetch yield data');
                    }
                    const yieldData = await yieldResponse.json();
                    estimatedYield = yieldData.result;
                } catch (error) {
                    console.error('Error fetching yield data:', error);
                }

                // Fetch disease and stress values from their respective APIs
                let diseaseValue = '0';
                try {
                    const diseaseResponse = await fetch(`${API_BASE_URL}/project/total/disease-pct/${id}`);
                    if (!diseaseResponse.ok) {
                        throw new Error('Failed to fetch disease data');
                    }
                    const diseaseData = await diseaseResponse.json();
                    diseaseValue = diseaseData.result;
                } catch (error) {
                    console.error('Error fetching disease data:', error);
                }

                let stressValue = '0';
                try {
                    const stressResponse = await fetch(`${API_BASE_URL}/project/total/stress-pct/${id}`);
                    if (!stressResponse.ok) {
                        throw new Error('Failed to fetch stress data');
                    }
                    const stressData = await stressResponse.json();
                    stressValue = stressData.result;
                } catch (error) {
                    console.error('Error fetching stress data:', error);
                }

                // Update metrics with API data
                setMetrics({
                    coveredArea: { 
                        value: areaValue, 
                        change: '8.5% Up from last Project', 
                        positive: parseFloat(areaValue) > 0 
                    },
                    estimatedYield: {
                        value: estimatedYield,
                        change: '1.3% Up from last Project',
                        positive: true,
                    },
                    IOTDevices: {
                        value: `${iotDeviceCount}`,
                        change: `${iotDeviceCount} Device${iotDeviceCount > 1 ? 's' : ''}`,
                        positive: iotDeviceCount > 0,
                    },
                    validPeriod: {
                        value: `${diffTime > 0 ? diffTime : 0}`,
                        change: 'Days Remaining',
                        positive: diffTime > 28,
                    },
                    estimatedStress: {
                        value: `${stressValue}%`,
                        change: 'Compared to last Record',
                        positive: parseFloat(stressValue) < 50,
                    },
                    estimatedDisease: {
                        value: `${diseaseValue}%`,
                        change: 'Compared to last Record',
                        positive: parseFloat(diseaseValue) < 50,
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
                {!isDiseaseActive && !isStressActive &&  (
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
                )}

                {/* Stress Estimation Card */}
                {isStressActive && !isDiseaseActive && !isYieldActive && (
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.estimatedStress.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <GrassIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.estimatedStress.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Estimated Stress (%)
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.estimatedStress.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.estimatedStress.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.estimatedStress.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                )}

                {/* Disease Estimation Card */}
                {isDiseaseActive && !isStressActive && !isYieldActive && (
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.estimatedDisease.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <CoronavirusIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#5D6965', display: 'inline-block' }}>
                                {metrics.estimatedDisease.value}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Nunito, Poppins, sans-serif', fontSize: '16px', color: '#5D6965' }} variant="h6">
                                Estimated Disease (%)
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.estimatedDisease.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.estimatedDisease.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.estimatedDisease.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Statistics;
