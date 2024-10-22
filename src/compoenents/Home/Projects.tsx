import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/projects.css';

interface Project {
  id: number;
  projectName: string;
  status: string;
  agent: {
    firstName: string;
    lastName: string;
  };
  plantation: {
    plantationName: string;
    plantationImgUrl: string;
  };
  iotDeviceList: Array<{ id: number }>;
  createdDate: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/project/plantation/2');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (projectId: number) => {
    navigate(`/home/customer-main-detail/${projectId}`);
  };

  return (
    <div className="projects-container">
      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : (
        projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card-container"
            onClick={() => handleCardClick(project.id)}
            style={{ cursor: 'pointer' }} // Add pointer to indicate clickability
          >
            <div className="project-card">
              <div className="creation-date">{new Date(project.createdDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}</div>
              <img className="project-image" src={project.plantation.plantationImgUrl} alt={project.projectName} />
              <div className="project-details" style={{ fontFamily: 'Nunito, Poppins, sans-serif', lineHeight: '1.2' }}>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{project.plantation.plantationName}</p>
                <h3 className="project-title" style={{ fontFamily: 'Nunito, Poppins, sans-serif', marginTop: '0' }}>{project.projectName}</h3>
                <p className="project-summary" style={{ fontFamily: 'Nunito, Poppins, sans-serif', lineHeight: '1.2' }}>
                  <span><strong>Status:</strong> {project.status}</span>
                  <span><strong>Agent:</strong> {project.agent.firstName} {project.agent.lastName}</span>
                  <span><strong>IoT Devices:</strong> {project.iotDeviceList.length}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;
