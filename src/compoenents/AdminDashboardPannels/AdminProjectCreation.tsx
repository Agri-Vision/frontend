import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateProject: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('');
    const [selectedPlantation, setSelectedPlantation] = useState('');
    const navigate = useNavigate(); // Use useNavigate to redirect

    const agents = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'David Lee' },
        { id: 4, name: 'Emily White' },
        { id: 5, name: 'Michael Brown' }
    ];

    const plantations = [
        { id: 1, name: 'Nuwara Eliya Plantation' },
        { id: 2, name: 'Kandy Plantation' },
        { id: 3, name: 'Uva Plantation' },
        { id: 4, name: 'Dambulla Plantation' },
        { id: 5, name: 'Matara Plantation' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            projectName,
            agent: agents.find(agent => agent.name === selectedAgent),
            plantation: plantations.find(plantation => plantation.name === selectedPlantation),
        };

        try {
            const response = await fetch('http://localhost:8080/create-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            
                navigate('/'); // Redirect back to the dashboard
            
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: '600px', margin: '0 auto' }}>
            <Typography 
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontFamily: 'Poppins , sans-serif', fontWeight: 'bold', color: '#5D6965' }}>
                Create New Project
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Project Name"
                            variant="outlined"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Select Agent"
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                            required
                        >
                            {agents.map((agent) => (
                                <MenuItem key={agent.id} value={agent.name}>
                                    {agent.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Select Plantation"
                            value={selectedPlantation}
                            onChange={(e) => setSelectedPlantation(e.target.value)}
                            required
                        >
                            {plantations.map((plantation) => (
                                <MenuItem key={plantation.id} value={plantation.name}>
                                    {plantation.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Create Project
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateProject;
