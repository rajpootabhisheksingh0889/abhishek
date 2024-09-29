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
import Swal from 'sweetalert2';
import axios from 'axios';
import DashboardCard from 'src/components/shared/DashboardCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPurchase = () => {
    const [formData, setFormData] = useState({
        vendor_id: '',
        product_id: '',
        price: '',
        quantity: '',
        // country: '',
        // state: '',
        // city: '',
        // address_line1: '',
        // address_line2: '',
        // postal_code: '',
        // taxation: '',
        // email: '',
        // phone: '',
    });

    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { productId } = useParams();
    const [selectedVendor, setSelectedVendor] = useState('');
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const vendorResponse = await axios.get('http://134.209.145.149:9999/api/vendor');
                const productResponse = await axios.get('http://134.209.145.149:9999/api/product');

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
            const response = await axios.get(`http://134.209.145.149:9999/api/inventory/${id}`);
            if (response.data) {
                const product = response.data;
                setFormData({
                    vendor_id: product.vendor_id || '',
                    product_id: product.product_id || '',
                    price: product.price || '',
                    quantity: product.quantity || '',
                    country: product.country || '',
                    state: product.state || '',
                    city: product.city || '',
                    postal_code: product.postal_code || '',
                    taxation: product.taxation || '',
                    email: product.email || '',
                    phone: product.phone || '',
                });
            }
        } catch (error) {
            toast.error('Failed to fetch product details.');
        }
    };
    const handleVendorChange = (e) => {
        const { value } = e.target;
        setSelectedVendor(value); // Update selected vendor
    };
    useEffect(() => {
        const fetchVendorDetails = async () => {
            if (!selectedVendor) return; // Don't fetch if no vendor is selected

            try {
                const response = await axios.get(`http://134.209.145.149:9999/api/vendor/${selectedVendor}`);
                if (response.data) {
                    const vendor = response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        vendor_id: vendor.id,
                        country: vendor.country || '',
                        state: vendor.state || '',
                        city: vendor.city || '',
                        address_line1: vendor.address_line1 || '',
                        address_line2: vendor.address_line2 || '',
                        postal_code: vendor.postal_code || '',
                        taxation: vendor.taxation || '',
                        email: vendor.email || '',
                        phone: vendor.phone || '',
                    }));
                }
            } catch (error) {
                toast.error('Failed to fetch vendor details.');
            }
        };

        fetchVendorDetails(); // Call the function inside useEffect
    }, [selectedVendor]); // Dependency array includes selectedVendor


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
        if (!formData.vendor_id || !formData.product_id || !formData.price || !formData.quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all required fields.',
            });
            return;
        }

        const apiUrl = isEditMode
            ? `http://134.209.145.149:9999/api/inventory/${productId}`
            : 'http://134.209.145.149:9999/api/update_inventory'; // Corrected backtick

        const payload = {
            vendor_id: formData.vendor_id,
            product_id: formData.product_id,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            // country: formData.country,
            // state: formData.state,
            // city: formData.city,
            // address_line1: formData.address_line1,
            // address_line2: formData.address_line2,
            // postal_code: formData.postal_code,
            // email: formData.email,
            // phone: formData.phone,
        };

        try {
            if (isEditMode) {
                await axios.put(apiUrl, payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Product updated successfully!',
                    timer: 3000, // Display for 3 seconds
                    showConfirmButton: false,
                });
            } else {
                await axios.post(apiUrl, payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Product added successfully!',
                    timer: 3000, // Display for 3 seconds
                    showConfirmButton: false,
                });
            }

            // Reset the form data
            setFormData({
                vendor_id: '',
                product_id: '',
                price: '',
                quantity: '',
                country: '',
                state: '',
                city: '',
                address_line1: '',
                address_line2: '',
                postal_code: '',
            });

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate(-1);
            }, 3000);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save product. Please try again.',
            });
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
                                    name="vendor_id"
                                    value={formData.vendor_id}
                                    onChange={handleVendorChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {vendors.map((vendor) => (
                                        <MenuItem key={vendor.id} value={vendor.id}>
                                            {vendor.owner_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    label="Select Product"
                                    name="product_id"
                                    value={formData.product_id}
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

                            <Grid item xs={12} md={6}>
                                <TextField
                                    type='number'
                                    label="Tax Percentage."
                                    name="tax"
                                    value={formData.tax}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required

                                />
                            </Grid>
                            {formData.vendor_id && !isEditMode && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Mobile Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        disabled
                                        InputLabelProps={{
                                            shrink: true,  // Forces the label to stay above the input
                                        }}
                                    />
                                </Grid>
                            )}

                            {formData.vendor_id && !isEditMode && (
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    disabled
                                        InputLabelProps={{
                                            shrink: true,  // Forces the label to stay above the input
                                        }}
                                />
                            </Grid>
                            )}
                            {formData.vendor_id && !isEditMode && (
                            <Grid item xs={12} md={12}>
                                <TextField
                                    type="text"
                                    label="Address and State"
                                    name="addressState"
                                    value={`${formData.address_line1},${formData.address_line2},${formData.country},${formData.city},${formData.state}, ${formData.country}, ${formData.postal_code}`}  
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    multiline
                                    rows={4} 
                                    disabled
                                />
                            </Grid>
                            )}

                           
                            
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
