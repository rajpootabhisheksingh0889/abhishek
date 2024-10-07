import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/Agentdash';
import ProductPerformance from './components/Custdash';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import DashboardCard from 'src/components/shared/DashboardCard';


const AdminDashboard = () => {
  return (
   < DashboardCard>
      <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
       Dashboard
      </Typography>
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <YearlyBreakup />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MonthlyEarnings />
          </Grid>
          {/* {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                {/* <MonthlyEarnings /> */}
              {/* </Grid>
            </Grid>
          </Grid> */}  
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
 </PageContainer>
      </ DashboardCard>

  );
};

export default AdminDashboard;
