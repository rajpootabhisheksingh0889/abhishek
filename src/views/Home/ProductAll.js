import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, IconButton, Grid, Paper, Typography, Box, TextField, Card, CardContent, CardMedia, Button, Pagination, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from './Layout';
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
  const [nameError, setNameError] = useState(''); // Track error state for the name

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
    setNameError(''); // Reset error on modal close
  };

  // Name validation logic
  const validateName = () => {
    if (!name.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    setNameError(''); // Clear error if valid
    return true;
  };

  const handlePayPalSuccess = async () => {
    const userId = localStorage.getItem('user_id');
    const payload = {
      user_id: userId ? parseInt(userId) : undefined,
      product_id: selectedProduct.id,
      name,
    };

    try {
      await axios.post('http://134.209.145.149:9999/api/itemorder', payload);
      console.log("Order submitted successfully");
    } catch (error) {
      console.error("Error submitting order:", error);
    }

    handleCloseModal();
  };

  const handleSubmit = () => {
    if (!validateName()) return; // Validate name before proceeding

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: selectedProduct.price,
            },
          }],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          console.log('Payment Approved: ', details);
          handlePayPalSuccess();
        });
      },
      onError: (err) => {
        console.error("PayPal error: ", err);
      }
    }).render('#paypal-button-container');
  };

  return (
    <Layout>
      <Container className='mt-4'>
        <StyledTypography variant="h1">Products</StyledTypography>
        <FilterContainer container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {/* Filter Controls (unchanged) */}
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
                          <Typography variant="h6" gutterBottom>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            ${product.price}
                          </Typography>
                          <StyledButton
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => handleBuyNowClick(product)}
                            sx={{ marginTop: 2 }}
                          >
                            Buy Now
                          </StyledButton>
                        </CardContent>
                      </CardContentWrapper>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
              <Box display="flex" justifyContent="center" mt={3}>
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
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
  <DialogTitle>Order Product</DialogTitle>
  <DialogContent>
    {/* Display the selected product's image */}
    {selectedProduct && (
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <CardMedia
          component="img"
          alt={selectedProduct.name}
          height="200"
          image="https://images.pexels.com/photos/27835751/pexels-photo-27835751/free-photo-of-a-tree-with-green-apples-on-it.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          sx={{ borderRadius: 8, marginBottom: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          {selectedProduct.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Price: ${selectedProduct.price}
        </Typography>
      </Box>
    )}

    {/* Input field for the user's name */}
    <StyledTextField
      label="Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      fullWidth
      sx={{ marginBottom: 2, marginTop: 2 }}
      error={!!nameError} // Show error if nameError is not empty
      helperText={nameError} // Show error message
    />

    {/* PayPal button container */}
    <div id="paypal-button-container"></div>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleSubmit} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>

      </Container>
    </Layout>
  );
}

export default ProductAll;
