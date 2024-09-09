import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MapIcon from '@mui/icons-material/Map';
import SpaIcon from '@mui/icons-material/Spa';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface Metric {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
}

const Statistics: React.FC = () => {
    const [metrics, setMetrics] = useState({
        totalUser: { value: '1,689', change: '8.5% Up from last Project', positive: true },
        totalProjects: { value: '10,293', change: '1.3% Up from last Project', positive: true },
        updatedProjects: { value: '5', change: '1 Down', positive: false },
        totalPending: { value: '25', change: 'Days Remaining', positive: true },
    });

    useEffect(() => {
        // Example: Fetch data from an API
        // Uncomment and replace the URL with your actual API endpoint
        /*
        fetch('https://api.example.com/metrics')
            .then(response => response.json())
            .then(data => {
                setMetrics({
                    totalUser: { value: data.totalUser, change: data.userChange, positive: data.userPositive },
                    totalProjects: { value: data.totalProjects, change: data.projectChange, positive: data.projectPositive },
                    updatedProjects: { value: data.updatedProjects, change: data.updatedChange, positive: data.updatedPositive },
                    totalPending: { value: data.totalPending, change: data.pendingChange, positive: data.pendingPositive },
                });
            })
            .catch(error => console.error('Error fetching metrics:', error));
        */
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* Static Card for Total Users */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.totalUser.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <MapIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>
                                {metrics.totalUser.value}
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">
                                Covered Area (m²)
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.totalUser.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.totalUser.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.totalUser.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Static Card for Total Projects */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.totalProjects.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <SpaIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                textTransform: 'capitalize',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>
                                {metrics.totalProjects.value}
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">
                                Estimated Yield
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.totalProjects.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.totalProjects.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.totalProjects.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Static Card for Updated Projects */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.updatedProjects.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <PodcastsIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                textTransform: 'capitalize',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>
                                {metrics.updatedProjects.value}
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">
                                Active IOT Devices
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.updatedProjects.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.updatedProjects.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.updatedProjects.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Static Card for Total Pending */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
                        <Avatar sx={{ bgcolor: metrics.totalPending.positive ? 'success.light' : 'error.light', marginRight: 1 }}>
                            <PendingActionsIcon />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                textTransform: 'capitalize',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>
                                {metrics.totalPending.value}
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">
                                Valid Period
                            </Typography>
                            <Typography variant="body2" sx={{ color: metrics.totalPending.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.totalPending.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.totalPending.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;


