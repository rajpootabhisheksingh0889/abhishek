import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderMaintenance = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                textAlign: 'center',
                py: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
            }}
        >
            <ConstructionIcon sx={{ fontSize: 80, color: 'gray' }} />
            <Typography variant="h3" component="h1" gutterBottom>
                Under Maintenance
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                We are currently performing some updates. Please check back later.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.reload()}
                sx={{ mt: 3 }}
            >
                Refresh Page
            </Button>
        </Container>
    );
};

export default UnderMaintenance;
