import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Agent {
    id: number;
    firstName: string;
    lastName: string;
}

interface Plantation {
    id: number;
    plantationName: string;
}

const AdminProjectCreation: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [selectedAgent, setSelectedAgent] = useState<string | number>('');
    const [selectedPlantation, setSelectedPlantation] = useState<string | number>('');
    const [agents, setAgents] = useState<Agent[]>([]);
    const [plantations, setPlantations] = useState<Plantation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Fetch agents and plantations when the component mounts
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/identity/user/role/agent');
                setAgents(response.data);
            } catch (error) {
                setError('Failed to fetch agents');
            }
        };

        const fetchPlantations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/plantation');
                setPlantations(response.data);
            } catch (error) {
                setError('Failed to fetch plantations');
            }
        };

        fetchAgents();
        fetchPlantations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!projectName || !selectedAgent || !selectedPlantation) {
            setError('Please fill in all required fields');
            return;
        }

        const projectData = {
            projectName,
            agent: { id: selectedAgent },
            plantation: { id: selectedPlantation },
        };

        try {
            setLoading(true);
            console.log(projectData)
            console.log(projectData.agent)
            console.log(projectData.plantation)
            await axios.post('http://localhost:8080/project', projectData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setSuccessMessage('Project created successfully!');
            // Clear the form fields
            setProjectName('');
            setSelectedAgent('');
            setSelectedPlantation('');
        } catch (error) {
            setError('An error occurred while creating the project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: '600px', margin: '0 auto' }}>
            <Typography 
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontFamily: 'Poppins , sans-serif', fontWeight: 'bold', color: '#5D6965' }}
            >
                Create New Project
            </Typography>

            {error && (
                <Typography color="Red" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}

            {successMessage && (
                <Typography color="Green" sx={{ marginBottom: 2 }}>
                    {successMessage}
                </Typography>
            )}

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
                                <MenuItem key={agent.id} value={agent.id}>
                                    {agent.firstName} {agent.lastName}
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
                                <MenuItem key={plantation.id} value={plantation.id}>
                                    {plantation.plantationName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Create Project'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AdminProjectCreation;
