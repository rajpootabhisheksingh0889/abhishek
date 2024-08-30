import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Divider, Checkbox, FormControlLabel, Box, TextField, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from './Layout';

// Styled components
const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const Content = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '100vh',
}));

// Dummy product data
const dummyProducts = [
  { id: 1, name: 'Product 1', price: '$50', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: '$75', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: '$100', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', price: '$125', image: 'https://via.placeholder.com/150' },
];

function ProductAll() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = dummyProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Container className='mt-4'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Sidebar>
              <Typography variant="h6">Filters</Typography>
              <Divider />
              <FormControlLabel control={<Checkbox />} label="Category 1" />
              <FormControlLabel control={<Checkbox />} label="Category 2" />
              <FormControlLabel control={<Checkbox />} label="Category 3" />
              <Divider />
              <Typography variant="h6">Price Range</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel control={<Checkbox />} label="$0 - $50" />
                <FormControlLabel control={<Checkbox />} label="$51 - $100" />
                <FormControlLabel control={<Checkbox />} label="$101 - $200" />
              </Box>
            </Sidebar>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Content>
              <Typography variant="h4" gutterBottom>
                Product Listings
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                margin="normal"
              />
              <Grid container spacing={3} marginTop={2}>
                {filteredProducts.map(product => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.price}
                        </Typography>
                        <Button variant="contained" color="primary" fullWidth>
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default ProductAll;
