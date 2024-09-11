import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../assets/styles/agentDashboard.css";
import DashboardMetrics from '../compoenents/AgentDashboardPannels/DashboardMetrics';
import ProjectSection from '../compoenents/AgentDashboardPannels/ProjectSection';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    return (
        <Box sx={{ padding: 2, maxWidth: '100%', margin: '0 auto' }}>
            <Grid container spacing={3}>
                {/* Dashboard Header */}
                <Grid item xs={12}>
                    <Typography 
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{ fontFamily: 'Poppins , sans-serif',
                            fontWeight: 'bold',
                            color: '#5D6965'}}>
                        Admin Dashboard
                    </Typography>
                </Grid>
                
                {/* Metrics Section */}
                <Grid item xs={12}>
                    <DashboardMetrics />
                </Grid>

                {/* Create Projects Button */}
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ marginBottom: 2 }}
                        onClick={() => navigate('create-project')} // Updated to use navigate
                    >
                        Create Projects
                    </Button>
                </Grid>

                {/* New Assignments Section */}
                <Grid item xs={12}>
                    <ProjectSection
                        title="Projects"
                        apiEndpoint="https://api.example.com/new-assignments"
                        initialData={[
                            { id: '1', estateName: 'Some Estate', title: 'Description 1', date: '10 Juli 2022', imageUrl: '../assets/img/estate1.jpeg' },
                            { id: '2', estateName: 'HellBodde Estate', title: 'Description 2', date: '11 Juli 2022', imageUrl: '/path/to/image2.jpg' },
                            { id: '3', estateName: 'Dunkel Estate', title: 'Description 3', date: '12 Juli 2022', imageUrl: '/path/to/image3.jpg' },
                        ]}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
