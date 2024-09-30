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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import DashboardCard from 'src/components/shared/DashboardCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const taxTypes = [
    { id: 1, name: 'GST', percentage: 18 },
    { id: 2, name: 'VAT', percentage: 15 },
    { id: 3, name: 'Sales Tax', percentage: 10 },
    { id: 4, name: 'No Tax', percentage: 0 },
];

const AddPurchase = () => {
    const [formData, setFormData] = useState({
        vendor_id: '',
        product_id: '',
        price: '',
        quantity: '',
        invoice: '',
        date: '',
        tax_type: '',
        tax_percentage: 0,
        phone: '',
        email: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
    });

    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { productId } = useParams();
    const [purchases, setPurchases] = useState([]);

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
    }, []);
    const handleFinalSubmit = () => {
        // Final submission logic goes here (e.g., sending purchases to the server)
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'All purchases submitted successfully!',
            timer: 3000,
            showConfirmButton: false,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Set tax percentage based on selected tax type
        if (name === 'tax_type') {
            const selectedTax = taxTypes.find(tax => tax.id === parseInt(value));
            setFormData(prevData => ({
                ...prevData,
                tax_percentage: selectedTax ? selectedTax.percentage : 0,
            }));
        }

        // Populate vendor info if a vendor is selected
        if (name === 'vendor_id') {
            const selectedVendor = vendors.find(vendor => vendor.id === parseInt(value));
            if (selectedVendor) {
                setFormData(prevData => ({
                    ...prevData,
                    phone: selectedVendor.phone,
                    email: selectedVendor.email,
                    address_line1: selectedVendor.address_line1,
                    address_line2: selectedVendor.address_line2,
                    city: selectedVendor.city,
                    state: selectedVendor.state,
                    country: selectedVendor.country,
                    postal_code: selectedVendor.postal_code,
                }));
            } else {
                setFormData(prevData => ({
                    ...prevData,
                    phone: '',
                    email: '',
                    address_line1: '',
                    address_line2: '',
                    city: '',
                    state: '',
                    country: '',
                    postal_code: '',
                }));
            }
        }
    };

    const handleSubmit = (e) => {
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

        // Save the purchase data locally
        const newPurchase = {
            ...formData,
            id: purchases.length + 1,
        };

        setPurchases((prevPurchases) => [...prevPurchases, newPurchase]);

        // Reset form data
        setFormData({
            vendor_id: '',
            product_id: '',
            price: '',
            quantity: '',
            invoice: '',
            date: '',
            tax_type: '',
            tax_percentage: 0,
            phone: '',
            email: '',
            address_line1: '',
            address_line2: '',
            city: '',
            state: '',
            country: '',
            postal_code: '',
        });

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Product added successfully!',
            timer: 3000,
            showConfirmButton: false,
        });
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
                        onClick={() => navigate(-1)}
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
                                    label="Invoice Number"
                                    name="invoice"
                                    value={formData.invoice}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="date"
                                    label="Date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    label="Select Vendor"
                                    name="vendor_id"
                                    value={formData.vendor_id}
                                    onChange={handleChange}
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
                            {formData.vendor_id && !isEditMode && (
                                <>
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
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                  
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            type="text"
                                            label="Address and State"
                                            name="address"
                                            value={`${formData.address_line1}, ${formData.address_line2}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.postal_code}`}
                                            onChange={handleChange}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            multiline
                                            rows={4}
                                            disabled
                                        />
                                    </Grid>
                                </>
                            )}
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
                                    select
                                    label="Select Tax Type"
                                    name="tax_type"
                                    value={formData.tax_type}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                >
                                    {taxTypes.map((tax) => (
                                        <MenuItem key={tax.id} value={tax.id}>
                                            {tax.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {formData.tax_type && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type="number"
                                        label="Tax Percentage"
                                        name="tax_percentage"
                                        value={formData.tax_percentage}
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            readOnly: true, // Make it read-only
                                        }}
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
            {/* Purchases Table */}
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h4">Purchases</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Invoice Number</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Vendor ID</TableCell>
                                    <TableCell>Product ID</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Tax Type</TableCell>
                                    <TableCell>Tax Percentage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {purchases.map((purchase) => (
                                    <TableRow key={purchase.id}>
                                        <TableCell>{purchase.invoice}</TableCell>
                                        <TableCell>{purchase.date}</TableCell>
                                        <TableCell>{purchase.vendor_id}</TableCell>
                                        <TableCell>{purchase.product_id}</TableCell>
                                        <TableCell>{purchase.price}</TableCell>
                                        <TableCell>{purchase.quantity}</TableCell>
                                        <TableCell>{taxTypes.find(tax => tax.id === parseInt(purchase.tax_type))?.name || ''}</TableCell>
                                        <TableCell>{purchase.tax_percentage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {purchases.length > 0 && ( // Conditional rendering of the submit button
                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFinalSubmit}
                                fullWidth
                            >
                                Submit All Purchases
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
            <ToastContainer />
        </DashboardCard>
    );
};

export default AddPurchase;
