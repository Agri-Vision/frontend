// import { CssBaseline } from '@mui/material';
// import React from 'react';
// import { Container } from '@mui/material';

// import "../assets/styles/agentDashboard.css";
// //import StatCards from "../compoenents/AgentDashboardPannels/StatCards";
// import NewAssignments from "../compoenents/AgentDashboardPannels/NewAssignments";
// import UpComingRenews from "../compoenents/AgentDashboardPannels/UpComingRenews";
// import DashboardMetrics from '../compoenents/AgentDashboardPannels/DashboardMetrics';
// import ProjectSection from '../compoenents/AgentDashboardPannels/ProjectSection';

// const AgentDashboard = () => {

// return (
 

//   <div className="dashboard">
//   <div className="dashboard-header">
//     <h1>Dashboard</h1>
//     {/* <StatCards /> */}
//     <DashboardMetrics />
//   </div>
//   {/* <NewAssignments />
//   <UpComingRenews /> */}
//   <ProjectSection title="New Assignments" apiEndpoint="https://api.example.com/new-assignments" />
//   <ProjectSection title="Upcoming Renew" apiEndpoint="https://api.example.com/upcoming-renew" />
//   <ProjectSection title="Up To Date" apiEndpoint="https://api.example.com/up-to-date" />
        
// </div>


// );
// // return (
// //   <Container sx={{ paddingY: 4 }}>
//         //     <DashboardMetrics />
//         //     <ProjectSection title="New Assignments" apiEndpoint="https://api.example.com/new-assignments" />
//         //     <ProjectSection title="Upcoming Renew" apiEndpoint="https://api.example.com/upcoming-renew" />
//         //     <ProjectSection title="Up To Date" apiEndpoint="https://api.example.com/up-to-date" />
//         // </Container>
// // );
// };

// export default AgentDashboard;

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import "../assets/styles/agentDashboard.css";
import DashboardMetrics from '../compoenents/AgentDashboardPannels/DashboardMetrics';
import ProjectSection from '../compoenents/AgentDashboardPannels/ProjectSection';

const AgentDashboard: React.FC = () => {
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
                        apiEndpoint="https://api.example.com/new-assignments"
                        initialData={[
                            { id: '1', estateName: 'Some Estate', title: 'Description 1', date: '10 Juli 2022', imageUrl: '../assets/img/estate1.jpeg' },
                            { id: '2', estateName: 'HellBodde Estate', title: 'Description 2', date: '11 Juli 2022', imageUrl: '/path/to/image2.jpg' },
                            { id: '3', estateName: 'Dunkel Estate', title: 'Description 3', date: '12 Juli 2022', imageUrl: '/path/to/image3.jpg' },
                        ]}
                    />
                </Grid>

                {/* Upcoming Renew Section */}
                <Grid item xs={12}>
                    <ProjectSection
                        title="Upcoming Renew"
                        apiEndpoint="https://api.example.com/upcoming-renew"
                        initialData={[
                            { id: '4', estateName: 'Forest Estate', title: 'Description 4', date: '13 Juli 2022', imageUrl: '/path/to/image4.jpg' },
                            { id: '5', estateName: 'Riverbank Estate', title: 'Description 5', date: '14 Juli 2022', imageUrl: '/path/to/image5.jpg' },
                            { id: '6', estateName: 'Mountain View Estate', title: 'Description 6', date: '15 Juli 2022', imageUrl: '/path/to/image6.jpg' },
                            { id: '7', estateName: 'Beach Estate', title: 'Description 7', date: '16 Juli 2022', imageUrl: '/path/to/image7.jpg' },
                        ]}
                    />
                </Grid>

                {/* Up To Date Section */}
                <Grid item xs={12}>
                    <ProjectSection
                        title="Up To Date"
                        apiEndpoint="https://api.example.com/up-to-date"
                        initialData={[]} // No data to show "No current assignments"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AgentDashboard;



