import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, IconButton, Grid, Paper, Typography, Box, TextField, Card, CardContent, CardMedia, Button, Pagination, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
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

const CardContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 8;

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, filterType, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://134.209.145.149:9999/api/product', {
        params: {
          page,
          limit: itemsPerPage,
          filterType,
          category: selectedCategory,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://134.209.145.149:9999/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNowClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
    setName('');
    setMobile('');
  };

  const handleSubmit = () => {
    // Handle PayPal payment processing here
    console.log("Name:", name, "Mobile:", mobile);
    handleCloseModal();
  };

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
        <Grid container spacing={3} marginBottom={3.5}>
          <Grid item xs={12}>
            <Content>
              <Grid container spacing={2}>
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
                            onClick={() => handleBuyNowClick(product)}
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

        {/* Modal for Buy Now */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Purchase {selectedProduct?.name}</DialogTitle>
          <DialogContent>
            <img
              src="https://images.pexels.com/photos/27835751/pexels-photo-27835751/free-photo-of-a-tree-with-green-apples-on-it.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt={selectedProduct?.name}
              height="250"
              style={{ width: '100%', marginBottom: '16px' }}
            />
            <Typography variant="h6">Price: {selectedProduct?.price}</Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Mobile No"
              variant="outlined"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Use PayPal</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}

export default ProductAll;
