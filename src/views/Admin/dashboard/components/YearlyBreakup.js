import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Box } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';
import DashboardCard from 'src/components/shared/DashboardCard';

const MonthlyEarnings = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [inactiveCustomers, setInactiveCustomers] = useState(0);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://134.209.145.149:9999/api/listUser?role_id=2&status=all');
        const customers = response.data.users;

        // Adjusted filtering for status: 1 (active) and status: 0 (inactive)
        const active = customers.filter(customer => customer.status === 1).length;   // status 1 = active
        const inactive = customers.filter(customer => customer.status === 0).length; // status 0 = inactive

        setTotalCustomers(customers.length);
        setActiveCustomers(active);
        setInactiveCustomers(inactive);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  // Chart options
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  // Chart series for active/inactive customers
  const seriescolumnchart = [activeCustomers, inactiveCustomers];

  return (
    <DashboardCard title="Customer">
      <Grid container spacing={3}>
        {/* Total Customers and Data */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h2" fontWeight="700" color={primary}>
            {totalCustomers} Customers
          </Typography>
          <Stack direction="row" spacing={1} mt={2} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 32, height: 32 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="h6" fontWeight="600" color={primary}>
              +{totalCustomers > 0 ? ((activeCustomers / totalCustomers) * 100).toFixed(2) : 0}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              active Customer
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 10, height: 10, bgcolor: primary }}></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Active: {activeCustomers}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 10, height: 10, bgcolor: primarylight }}></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Inactive: {inactiveCustomers}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Donut Chart */}
        <Grid item xs={5} sm={5}>
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              height="150px"
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
