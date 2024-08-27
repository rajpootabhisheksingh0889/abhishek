import React from 'react';
import { Card, CardContent, CardMedia, Container, Grid, Typography, IconButton, Box, Button, Rating } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const cards = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', rating: 4.5, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', rating: 4.0, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', rating: 4.1, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
    { id: 4, name: 'Anna Williams', email: 'anna.williams@example.com', rating: 5.0, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
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
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleViewClick = (id) => {
        navigate(`/agentdetails/${id}`); // Navigate to /agentdetails with the agent ID
    };

    return (
        <Container sx={{ mt: 4 }}>
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
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleViewClick(card.id)} // Add onClick handler
                                    >
                                        View
                                    </Button>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
        </Container>
    );
};

export default AgentHome;
