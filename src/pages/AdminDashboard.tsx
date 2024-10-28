import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../assets/styles/agentDashboard.css";
import DashboardMetrics from '../compoenents/AgentDashboardPannels/DashboardMetrics';
import ProjectSection from '../compoenents/AdminDashboardPanels/ProjectSelection';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<any[]>([]); // State to store project data
    const [loading, setLoading] = useState(true); // State to show loading status
    const [error, setError] = useState<string | null>(null); // State to show error messages

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Fetch the projects from the API
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/project`);
                setProjects(response.data); // Update the state with fetched data
            } catch (error) {
                setError('Failed to fetch projects');
            } finally {
                setLoading(false); // Set loading to false in either case
            }
        };

        fetchProjects();
    }, []);

    // Extracting the condition into a statement
    let content;
    if (loading) {
        content = <Typography>Loading Projects...</Typography>;
    } else if (error) {
        content = <Typography color="error">{error}</Typography>;
    } else {
        content = <ProjectSection title="Projects" projects={projects} />; // Pass projects prop correctly
    }

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
                        onClick={() => navigate('create-project')} 
                    >
                        Create Projects
                    </Button>
                    {/* Create Organization Button */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ marginLeft: 2, marginBottom: 2 }}
                        onClick={() => navigate('create-organization')} 
                    >
                        Create Organization
                    </Button>
                </Grid>

                {/* Project Section */}
                <Grid item xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
