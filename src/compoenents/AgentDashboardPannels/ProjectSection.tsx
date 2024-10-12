import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

interface Project {
    id: string;
    estateName: string;
    title: string;
    date: string;
    imageUrl: string;
}

interface ProjectSectionProps {
    title: string;
    apiEndpoint: string;
    initialData: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, apiEndpoint, initialData }) => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>(initialData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsToShow = 3; // Number of projects visible at a time

    useEffect(() => {
        // Optionally, fetch data from API to update the projects
        /*
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => setProjects(data.projects))
            .catch(error => console.error('Error fetching projects:', error));
        */
    }, [apiEndpoint]);

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

    return (
        <Box sx={{ marginTop: 4, width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <IconButton onClick={handlePrevSlide} disabled={currentIndex === 0}>
                    <ArrowBackIosIcon />
                </IconButton>
                <div
                    style={{
                        display: 'flex',
                        overflow: 'hidden',
                        width: 'calc(100% - 96px)', // Adjust width to account for arrow buttons
                        height: '350px', // Adjusted height for the card container
                        position: 'relative',
                        justifyContent: 'center', // Center items horizontally
                        alignItems: 'center', // Center items vertically
                    }}
                >
                    {projects.length === 0 ? (
                        <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center' }}>
                            No current assignments.
                        </Typography>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                transition: 'transform 0.5s ease-in-out',
                                transform: `translateX(-${currentIndex * (100 / projectsToShow)}%)`,
                                width: `${(projects.length * 100) / projectsToShow}%`, // Dynamic width for the slider
                            }}
                        >
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => handleCardClick(project.id)}
                                    style={{
                                        cursor: 'pointer',
                                        flex: '0 0 30%', // Adjust width for 3 cards
                                        maxWidth: '30%', // Ensure that it does not grow larger than 30%
                                        height: '300px', // Increased height to better match the Figma design
                                        margin: '0 15px',
                                        boxSizing: 'border-box',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <img
                                        src={project.imageUrl}
                                        alt={project.estateName}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '10px' }}>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {project.date}
                                        </Typography>
                                        <Typography variant="h6">{project.estateName}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {project.title}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <IconButton onClick={handleNextSlide} disabled={currentIndex >= projects.length - projectsToShow}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </Box>
    );
};

export default ProjectSection;
