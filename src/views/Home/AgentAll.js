import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  IconButton,
  Box,
  Button,
  Rating,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const cards = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', rating: 4.5, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', rating: 4.0, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', rating: 4.1, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
  { id: 4, name: 'Anna Williams', email: 'anna.williams@example.com', rating: 5.0, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg' },
];

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const AgentAll = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleViewClick = (id) => {
    navigate(`/agentdetails/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter and search logic
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filter === '' || card.rating === filter)
  );

  return (
    <Layout>
      
      <Container sx={{ mt: 4, mb: 2.5 }}>
        <StyledTypography variant="h1">Our Agents</StyledTypography>
        {/* Search Bar */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <StyledTextField
            variant="outlined"
            placeholder="Search agents"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '100%', maxWidth: '300px' }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Filters Section */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filter by Rating</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter by Rating"
                >
                  <MenuItem value="">All Ratings</MenuItem>
                  <MenuItem value={5}>5 Stars</MenuItem>
                  <MenuItem value={4}>4 Stars</MenuItem>
                  <MenuItem value={3}>3 Stars</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filter by Area</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter by Area"
                >
                  <MenuItem value="">All Areas</MenuItem>
                  <MenuItem value={1}>Area 1</MenuItem>
                  <MenuItem value={2}>Area 2</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filter by Language</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter by Language"
                >
                  <MenuItem value="">All Languages</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter by Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              {/* Additional filters can be added here */}
            </Paper>
          </Grid>

          {/* Agents Display Section */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {filteredCards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
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
                          onClick={() => handleViewClick(card.id)}
                        >
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AgentAll;
