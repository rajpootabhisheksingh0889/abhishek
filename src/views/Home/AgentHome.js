import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, IconButton, Box, Button, Rating } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';

const cards = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', rating: 4.5, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', rating: 4.0, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', rating: 3.5, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Anna Williams', email: 'anna.williams@example.com', rating: 5.0, image: 'https://via.placeholder.com/150' },
];

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    textTransform: 'uppercase',
}));

const AgentHome = () => {
    return (
        <Box padding={3} sx={{ mt: 0.5 }}>
            <StyledTypography variant="h1">Our Agents</StyledTypography>
            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={3} key={card.id}>
                        <StyledCard>
                            <CardMedia
                                component="img"
                                height="180"
                                image={card.image}
                                alt={card.name}
                                sx={{ borderRadius: '50%', width: '60%', margin: '16px auto' }}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {card.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {card.email}
                                </Typography>
                                <Rating value={card.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center' }}>
                                    <IconButton aria-label="call" color="primary">
                                        <PhoneIcon />
                                    </IconButton>
                                    <Button variant="outlined" color="primary">
                                        View
                                    </Button>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AgentHome;
