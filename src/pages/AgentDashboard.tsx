import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import "../assets/styles/agentDashboard.css";
import DashboardMetrics from '../compoenents/AgentDashboardPannels/DashboardMetrics';
import ProjectSection from '../compoenents/AgentDashboardPannels/ProjectSection';

const AgentDashboard: React.FC = () => {
    const [newAssignments, setNewAssignments] = useState<any[]>([]);
    const [upcomingRenewals, setUpcomingRenewals] = useState<any[]>([]);
    const [upToDateProjects, setUpToDateProjects] = useState<any[]>([]);
    const agentId = 2; // Hardcoded agent ID for now

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/project/agent/${agentId}`);
                const data = await response.json();

                // Categorize the projects into the appropriate sections based on their status
                const newAssignments = data.filter((project: any) => project.status === 'NEW');
                const upcomingRenewals = data.filter((project: any) => project.status === 'PENDING');
                const upToDateProjects = data.filter((project: any) => project.status === 'COMPLETED');
                
                setNewAssignments(newAssignments);
                setUpcomingRenewals(upcomingRenewals);
                setUpToDateProjects(upToDateProjects);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };

        fetchProjects();
    }, [agentId]);

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
                        Agent Dashboard
                    </Typography>
                </Grid>
                
                {/* Metrics Section */}
                <Grid item xs={12}>
                    <DashboardMetrics />
                </Grid>

                {/* New Assignments Section */}
                <Grid item xs={12}>
                    <ProjectSection
                        title="New Assignments"
                        projects={newAssignments}
                    />
                </Grid>

                {/* Upcoming Renew Section */}
                <Grid item xs={12}>
                    <ProjectSection
                        title="Upcoming Renew"
                        projects={upcomingRenewals}
                    />
                </Grid>

                {/* Up To Date Section */}
                <Grid item xs={12}>
                    <ProjectSection
                        title="Up To Date"
                        projects={upToDateProjects}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AgentDashboard;
