import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PeopleIcon from '@mui/icons-material/People';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import UpdateIcon from '@mui/icons-material/Update';
import PendingIcon from '@mui/icons-material/Pending';
import '../../assets/styles/Statistics.css';


interface StatsCardProps {
  title: string;
  value: number;
  percentage: number;
  isIncrease: boolean;
  icon: React.ReactElement;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, isIncrease, icon, bgColor }) => (
  <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: bgColor }}>
    <Box display="flex" justifyContent="center" alignItems="center">
      <div className="icon" style={{ fontSize: '40px', marginRight: '8px' }}>{icon}</div>
      <Box>
        <Typography variant="h5">{value}</Typography>
        <Typography color="textSecondary">{title}</Typography>
      </Box>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ color: isIncrease ? 'green' : 'red' }}>
      {isIncrease ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      <Typography variant="body2">{percentage}% {isIncrease ? 'Up' : 'Down'} from yesterday</Typography>
    </Box>
  </Paper>
);

interface StatsData {
  totalUsers: number;
  totalUsersChange: number;
  totalProjects: number;
  totalProjectsChange: number;
  updatedProjects: number;
  updatedProjectsChange: number;
  totalPending: number;
  totalPendingChange: number;
}

const sampleData: StatsData = {
  totalUsers: 40689,
  totalUsersChange: 8.5,
  totalProjects: 10293,
  totalProjectsChange: 1.3,
  updatedProjects: 89000,
  updatedProjectsChange: -4.3,
  totalPending: 2040,
  totalPendingChange: 1.8,
};

const Statistics: React.FC = () => {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    // Simulating API call with sample data
    setTimeout(() => {
      setData(sampleData);
    }, 1000);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box className="dashboard-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Users"
              value={data.totalUsers}
              percentage={data.totalUsersChange}
              isIncrease={data.totalUsersChange >= 0}
              icon={<PeopleIcon />}
              bgColor="#f0f4ff"  // Custom background color
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Projects"
              value={data.totalProjects}
              percentage={data.totalProjectsChange}
              isIncrease={data.totalProjectsChange >= 0}
              icon={<AllInboxIcon />}
              bgColor="#fff9eb"  // Custom background color
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Updated Projects"
              value={data.updatedProjects}
              percentage={data.updatedProjectsChange}
              isIncrease={data.updatedProjectsChange >= 0}
              icon={<UpdateIcon />}
              bgColor="#eafff5"  // Custom background color
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Pending"
              value={data.totalPending}
              percentage={data.totalPendingChange}
              isIncrease={data.totalPendingChange >= 0}
              icon={<PendingIcon />}
              bgColor="#fff4f4"  // Custom background color
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Statistics;
