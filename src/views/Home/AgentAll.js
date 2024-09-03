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
  Slider,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const cards = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: "46", language: "hindi,english", location: "Texas", rating: 4.5, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg', online: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: "26", language: "hindi,french", location: "Washington DC", rating: 4.0, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg', online: false },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', age: "38", language: "Punjabi,english", location: "California", rating: 4.1, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg', online: true },
  { id: 4, name: 'Anna Williams', email: 'anna.williams@example.com', age: "23", language: "hindi,chinies", location: "Toronto", rating: 5.0, image: 'https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg', online: false },
];

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
}));
const StatusDot = styled(Box)(({ online }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: online ? '#faaf00' : 'grey',
  display: 'inline-block',
  marginRight: 8,
}));

const StatusText = styled(Typography)(({ online }) => ({
  color: online ? 'green' : 'grey',
  fontSize: '0.875rem',
  display: 'inline',
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
  const [ratingFilter, setRatingFilter] = useState([0, 5]);

  const handleViewClick = (id) => {
    navigate(`/agentdetails/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingFilter(newValue);
  };

  // Filter and search logic
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filter === '' || card.rating >= ratingFilter[0] && card.rating <= ratingFilter[1])
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
          <Grid item xs={12} md={2}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              {/* Rating Filter Slider */}
              <Typography gutterBottom>Filter by Rating</Typography>
              <Slider
                value={ratingFilter}
                onChange={handleRatingChange}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.1}
                marks
                sx={{ mb: 2 }}
              />

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
          <Grid item xs={12} md={10}>
            <Grid container spacing={3}>
              {filteredCards.map((card) => (
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
                      <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        {card.name}
                        <StatusText online={card.online} sx={{ marginLeft: 1 }}>
                          <StatusDot online={card.online} />
                        </StatusText>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Age:- {card.age}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Location:- {card.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Language:- {card.language}
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
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AgentAll;
