import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid, Card, CardContent, CardMedia } from '@mui/material';
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
    const projectsToShow = 3; // Number of projects visible at a time

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
        console.log("id",projectId);
        navigate(`project/${projectId}`);
    };

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {title}
            </Typography>
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
                                    style={{ maxWidth: '480px' }}
                                >
                                    <Card sx={{ width: '100%' }}>
                                        {project.plantation?.plantationImgUrl && (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={project.plantation.plantationImgUrl}
                                                alt={project.plantation.plantationName}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography variant="h6">{project.plantation?.plantationName}</Typography>
                                            <Typography variant="body2">{project.projectName}</Typography>
                                            <Typography variant="body2">
                                                {project.agent?.firstName} {project.agent?.lastName}
                                            </Typography>
                                            <Typography variant="body2">Status: {project.status}</Typography>
                                            <Typography variant="body2">Assigned on: {new Date(project.createdDate).toLocaleString()}</Typography>
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
        </Box>
    );
};

export default ProjectSection;
