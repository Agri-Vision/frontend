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

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/identity/user/role/agent`);
                setAgents(response.data);
            } catch (error) {
                setError('Failed to fetch agents');
            }
        };

        const fetchPlantations = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/plantation`);
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
            await axios.post(`${API_BASE_URL}/project`, projectData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setSuccessMessage('Project created successfully!');
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
        <Box sx={{ padding: 3, maxWidth: '600px', margin: 'auto', backgroundColor: '#f8f8f8', borderRadius: 2, boxShadow: 2 }}>
            <Typography
                variant="h5"
                component="h2"
                sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#4a4a4a', textAlign: 'center', mb: 3 }}
            >
                Create New Project
            </Typography>

            {error && (
                <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {error}
                </Typography>
            )}

            {successMessage && (
                <Typography color="primary" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {successMessage}
                </Typography>
            )}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Project Name"
                            variant="outlined"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
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
                            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
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
                            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
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
                            sx={{ padding: '12px', borderRadius: 1, fontWeight: 'bold' }}
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
