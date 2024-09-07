import { CssBaseline } from '@mui/material';
import React from 'react';

import "../assets/styles/agentDashboard.css";
import StatCards from "../compoenents/AgentDashboardPannels/StatCards";
import NewAssignments from "../compoenents/AgentDashboardPannels/NewAssignments";
import UpComingRenews from "../compoenents/AgentDashboardPannels/UpComingRenews";
import DashboardMetrics from '../compoenents/AgentDashboardPannels/DashboardMetrics';

const AgentDashboard = () => {

return (
 

  <div className="dashboard">
  <div className="dashboard-header">
    <h1>Dashboard</h1>
    {/* <StatCards /> */}
    <DashboardMetrics />
  </div>
  <NewAssignments />
  <UpComingRenews />
</div>


);
};

export default AgentDashboard;

