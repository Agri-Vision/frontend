import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface Metric {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
}

const DashboardMetrics: React.FC = () => {
    // State to store the values of metrics fetched from an API
    const [metrics, setMetrics] = useState({
        totalUser: { value: '40', change: '1% Up from past month', positive: true },
        totalProjects: { value: '10', change: '1% Up from past month', positive: true },
        updatedProjects: { value: '14', change: '4% Down from past month', positive: false },
        totalPending: { value: '20', change: '1% Up from past month', positive: true },
    });

    // Optionally, fetch data from an API to update values
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
        <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
            <Grid container spacing={2}>
                {/* Static Card for Total Users */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'flex', display: 'flex', alignItems: 'center', gap: 2 , borderRadius: '16px'}}>
                        <Avatar sx={{ bgcolor: metrics.totalUser.positive ? 'success.light' : 'error.light',marginRight: 1 }}>
                            <PeopleIcon />
                        </Avatar>
                        <Box>
                        <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">Total Users</Typography>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>{metrics.totalUser.value}</Typography>
                            <Typography variant="body2" sx={{ color: metrics.totalUser.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.totalUser.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.totalUser.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Static Card for Total Projects */}
                <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'flex', display: 'flex', alignItems: 'center', gap: 2 , borderRadius: '16px'}}>
                <Avatar sx={{ bgcolor: metrics.totalProjects.positive ? 'success.light' : 'error.light',marginRight: 1 }}>
                            <PeopleIcon />
                        </Avatar>
                        <Box>
                        <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">Total Projects</Typography>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>{metrics.totalProjects.value}</Typography>
                            <Typography variant="body2" sx={{ color: metrics.totalProjects.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.totalProjects.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.totalProjects.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Static Card for Updated Projects */}
                <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'flex', display: 'flex', alignItems: 'center', gap: 2 , borderRadius: '16px'}}>
                <Avatar sx={{ bgcolor: metrics.updatedProjects.positive ? 'success.light' : 'error.light',marginRight: 1 }}>
                            <PeopleIcon />
                        </Avatar>
                        <Box>
                        <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">Updated Projects</Typography>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>{metrics.updatedProjects.value}</Typography>
                            <Typography variant="body2" sx={{ color: metrics.updatedProjects.positive ? 'green' : 'red', marginTop: 1 }}>
                                {metrics.updatedProjects.positive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {metrics.updatedProjects.change}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Static Card for Total Pending */}
                <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'flex', display: 'flex', alignItems: 'center', gap: 2 , borderRadius: '16px'}}>
                <Avatar sx={{ bgcolor: metrics.totalPending.positive ? 'success.light' : 'error.light',marginRight: 1 }}>
                            <PeopleIcon />
                        </Avatar>
                        <Box>
                        <Typography sx={{
                                fontFamily: 'Nunito, Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#5D6965',
                            }} variant="h6">Total Pending</Typography>
                            <Typography variant="h4" sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#5D6965',
                                display: 'inline-block'
                            }}>{metrics.totalPending.value}</Typography>
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

export default DashboardMetrics;
