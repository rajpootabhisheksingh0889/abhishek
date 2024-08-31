import React, { useState } from 'react';
import { Container, IconButton, Grid, Paper, Typography, Divider, Checkbox, FormControlLabel, Box, TextField, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from './Layout';
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Styled components
const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const Content = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '100vh',
}));



const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: 20,
  padding: '10px 20px',
  marginTop: '12px',
  textTransform: 'none',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  textTransform: 'uppercase',
}));
// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product.",
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
    price: "$10.00",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a great product.",
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
    price: "$20.00",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a great product.",
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
    price: "$30.00",
  },
  {
    id: 4,
    name: "Product 4",
    description: "This is a great product.",
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
    price: "$40.00",
  },
]; const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProductAll() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = dummyProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Container className='mt-4'>
        <StyledTypography variant="h1">Products</StyledTypography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={2}>
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
          <Grid item xs={12} sm={8} md={10}>
            <Content>
              {/* <StyledTypography variant="h1">All Product</StyledTypography> */}
              {/* <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                margin="normal"
              /> */}
              <Box display="flex" justifyContent="flex-end" mb={3}>
                <StyledTextField
                  variant="outlined"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: '100%', maxWidth: '300px' }}
                />
              </Box>
              <Grid container spacing={2} marginTop={2.5}>
                {filteredProducts.map(product => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <StyledCard sx={{ maxWidth: 345, borderRadius: 12 }}>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        height="200"
                        image={product.imageUrl}
                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                          </Typography>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                          {product.price}
                        </Typography>
                        <StyledButton
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          fullWidth
                        >
                          Buy Now
                        </StyledButton>
                      </CardContent>
                    </StyledCard>
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
