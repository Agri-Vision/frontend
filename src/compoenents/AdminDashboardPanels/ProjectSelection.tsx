import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';

interface ProjectSectionProps {
  title: string;
  projects: {
    id: number;
    projectName: string;
    agent: {
      firstName: string;
      lastName: string;
    };
    plantation: {
      plantationName: string;
      plantationImgUrl?: string;
    };
    status: string;
    createdDate: string;
  }[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, projects }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              {/* Display Plantation Image */}
              {project.plantation?.plantationImgUrl ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={project.plantation.plantationImgUrl}
                  alt={project.plantation.plantationName}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="140"
                  image="/default-placeholder.png" // Replace with a placeholder image if no plantation image is available
                  alt="Placeholder Image"
                />
              )}
              <CardContent>
                <Typography variant="h6">{project.plantation.plantationName}</Typography>
                <Typography variant="body2">{project.projectName}</Typography>
                <Typography variant="body2">{`${project.agent.firstName} ${project.agent.lastName}`}</Typography>
                <Typography variant="body2">Status: {project.status}</Typography>
                <Typography variant="body2">Assigned on: {new Date(project.createdDate).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProjectSection;
