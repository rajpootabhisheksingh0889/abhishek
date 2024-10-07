import React, { useState, useEffect } from 'react';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography, CircularProgress, Avatar, Box } from '@mui/material';
import axios from 'axios';

const RecentTransactions = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the agent list from the API
    axios
      .get('http://134.209.145.149:9999/api/listUser?role_id=3')
      .then((response) => {
        setAgents(response.data.users.slice(0, 7)); // Get the first 7 agents
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching agent data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardCard title="Agent List">
      {loading ? (
        <CircularProgress />
      ) : (
        <Timeline
          className="theme-timeline"
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {agents.map((agent) => (
            <TimelineItem key={agent.user_id}>
              <TimelineOppositeContent>
              
                <Typography variant="body2" color={agent.online_status === 'online' ? 'green' : 'red'}>
                  {agent.online_status === 'online' ? 'Online' : 'Offline'}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                {/* Show icon for online or offline */}
                <TimelineDot color={agent.online_status === 'online' ? 'success' : 'error'} variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {/* Avatar, Name, and Status */}
                <Box display="flex" alignItems="center">
                  {/* Avatar */}
                  <Avatar
                    src={agent.profile_image} // assuming profile_image contains the URL of the agent's image
                    alt={`${agent.first_name} ${agent.last_name}`}
                    sx={{ width: 40, height: 40, mr: 2 }} // Adjust size as needed
                  />
                  <Box>
                    {/* Display agent name */}
                    <Typography fontWeight="600">{agent.first_name} {agent.last_name}</Typography>
                    {/* Online/Offline status text */}
                    {/* <Typography variant="body2" color={agent.online_status === 'online' ? 'green' : 'red'}>
                      {agent.online_status === 'online' ? 'Online' : 'Offline'}
                    </Typography> */}
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </DashboardCard>
  );
};

export default RecentTransactions;
