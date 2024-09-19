import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    MenuItem,
    Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardCard from 'src/components/shared/DashboardCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPurchase = () => {
    const [formData, setFormData] = useState({
        name: '',
        vendor: '',
        product: '',
        price: '',
        quantity: '',
    });

    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { productId } = useParams();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const vendorResponse = await axios.get('https://api.qikads.in/api/vendor');
                const productResponse = await axios.get('https://api.qikads.in/api/product');

                setVendors(vendorResponse.data.data || []);
                setProducts(productResponse.data.products || []);
            } catch (error) {
                toast.error('Failed to fetch options.');
            }
        };

        fetchOptions();

        if (productId) {
            setIsEditMode(true);
            fetchProductDetails(productId);
        }
    }, [productId]);

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`https://api.qikads.in/api/language/${id}`);
            if (response.data) {
                const product = response.data;
                setFormData({
                    name: product.name || '',
                    vendor: product.vendor || '',
                    product: product.product || '',
                    price: product.price || '',
                    quantity: product.quantity || '',
                });
            }
        } catch (error) {
            toast.error('Failed to fetch product details.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.vendor || !formData.product || !formData.price || !formData.quantity) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const apiUrl = isEditMode
            ? `https://api.qikads.in/api/language/${productId}`
            : 'https://api.qikads.in/api/language';

        const payload = {
            name: formData.name,
            vendor: formData.vendor, // ID of the vendor
            product: formData.product, // ID of the product
            price: formData.price,
            quantity: formData.quantity,
        };

        try {
            if (isEditMode) {
                await axios.put(apiUrl, payload);
                toast.success('Product updated successfully!');
            } else {
                await axios.post(apiUrl, payload);
                toast.success('Product added successfully!');
            }
            setFormData({
                name: '',
                vendor: '',
                product: '',
                price: '',
                quantity: '',
            });
            navigate(-1);
        } catch (error) {
            toast.error('Failed to save product. Please try again.');
        }
    };

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    {isEditMode ? 'Edit Purchase' : 'Add Purchase'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleGoBack}
                    >
                        Go back
                    </Button>
                </Box>
            </Box>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    label="Select Vendor"
                                    name="vendor"
                                    value={formData.vendor}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {vendors.map((vendor) => (
                                        <MenuItem key={vendor.id} value={vendor.id}>
                                            {vendor.name} 
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    label="Select Product"
                                    name="product"
                                    value={formData.product}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.id}>
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="number"
                                    label="Price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="number"
                                    label="Quantity/Stock"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {isEditMode ? 'Update Purchase' : 'Add Purchase'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </DashboardCard>
    );
};

export default AddPurchase;
