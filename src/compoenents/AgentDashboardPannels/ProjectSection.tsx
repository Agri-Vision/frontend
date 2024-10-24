import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

interface ProjectSectionProps {
    title: string;
    projects: any[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, projects }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsToShow = 4; // Number of projects visible at a time
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projects.length > 0) {
            setLoading(false);
        }
    }, [projects]);

    const handleNextSlide = () => {
        if (currentIndex < projects.length - projectsToShow) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleCardClick = (projectId: string) => {
        navigate(`project/${projectId}`);
    };

    const handleUploadMapsClick = (projectId: string) => {
        navigate(`/home/agent-dashboard/upload-map/${projectId}`);
    };

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {title}
            </Typography>
            {loading ? (
                <Typography variant="body1" color="textSecondary">
                    Loading projects...
                </Typography>
            ) : (
                <Box display="flex" alignItems="center">
                    <IconButton onClick={handlePrevSlide} disabled={currentIndex === 0}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Box sx={{ width: '100%', overflow: 'hidden' }}>
                        {projects.length === 0 ? (
                            <Typography variant="body1" color="textSecondary">
                                No current assignments.
                            </Typography>
                        ) : (
                            <Grid
                                container
                                spacing={3}
                                sx={{
                                    transition: 'transform 0.5s ease-in-out',
                                    transform: `translateX(-${currentIndex * (100 / projectsToShow)}%)`,
                                }}
                            >
                                {projects.map((project) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={project.id}
                                        onClick={() => handleCardClick(project.id)}
                                        sx={{ maxWidth: '480px' }}
                                    >
                                        <Card
                                            sx={{
                                                width: '100%',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                borderRadius: '12px',
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                                },
                                            }}
                                        >
                                            {project.plantation?.plantationImgUrl && (
                                                <CardMedia
                                                    component="img"
                                                    height="180"
                                                    image={project.plantation.plantationImgUrl}
                                                    alt={project.plantation.plantationName}
                                                    sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px', objectFit: 'cover' }}
                                                />
                                            )}
                                            <CardContent sx={{ padding: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                                    {project.plantation?.plantationName}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                                                    {project.projectName}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                                                    Agent: {project.agent?.firstName} {project.agent?.lastName}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                                                    Status: <span style={{ fontWeight: 'bold' }}>{project.status}</span>
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                                                    Assigned on: {new Date(project.createdDate).toLocaleString()}
                                                </Typography>
                                                {project.status === 'PENDING' && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{
                                                            width: '100%',
                                                            marginTop: 2,
                                                            borderRadius: '8px',
                                                            padding: '10px 0',
                                                            textTransform: 'none',
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUploadMapsClick(project.id);
                                                        }}
                                                    >
                                                        Upload Maps
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                    <IconButton onClick={handleNextSlide} disabled={currentIndex >= projects.length - projectsToShow}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ProjectSection;
