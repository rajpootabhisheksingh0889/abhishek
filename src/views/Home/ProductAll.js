import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, IconButton, Grid, Paper, Typography, Box, TextField, Card, CardContent, CardMedia, Button, Pagination, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
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
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: 16,
  boxShadow: theme.shadows[5],
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[12],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: 20,
  padding: '12px 24px',
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  },
}));

// const Overlay = styled(Box)(({ theme }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
//   zIndex: 1,
//   transition: 'opacity 0.3s',
//   opacity: 0,
//   '&:hover': {
//     opacity: 1,
//   },
// }));

const CardContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

// Container for filters and search bar
const FilterContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

function ProductAll() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 8; // Number of products per page

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories for the category dropdown
  }, [page, filterType, filterValue, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.qikads.in/api/product', {
        params: {
          page,
          limit: itemsPerPage, // Limit the number of products per page
          filterType,
          filterValue,
          category: selectedCategory
        },
      });
      setProducts(response.data.products); // Assuming 'products' is the key in the API response
      setTotalPages(response.data.totalPages); // Assuming 'totalPages' is provided by the API
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.qikads.in/api/categories');
      setCategories(response.data.categories); // Assuming 'categories' is the key in the API response
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Container className='mt-4'>
        <StyledTypography variant="h1">Products</StyledTypography>
        <FilterContainer container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="filter-select-label">Filter by</InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Filter by"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price">Filter by Price</MenuItem>
                <MenuItem value="category">Filter by Category</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {filterType === 'category' && (
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <StyledTextField
                variant="outlined"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
        </FilterContainer>
        <Grid container spacing={3} marginBottom={3.5} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
          <Grid item xs={12} sm={8} md={12}>
            <Content>
              <Grid container spacing={2} marginTop={2.5}>
                {filteredProducts.map(product => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <StyledCard>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        height="200"
                        image="https://images.pexels.com/photos/27835751/pexels-photo-27835751/free-photo-of-a-tree-with-green-apples-on-it.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        sx={{ borderBottom: '1px solid #ddd' }}
                      />
                      {/* <Overlay /> */}
                      <CardContentWrapper>
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
                      </CardContentWrapper>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default ProductAll;
