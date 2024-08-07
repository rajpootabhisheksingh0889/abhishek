import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Skeleton,
    IconButton,
    Popover,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCard from 'src/components/shared/DashboardCard';
import NoData from "src/assets/images/products/NoData.jpg";
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://134.209.145.149:9999/api/prodList');
                setProducts(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handlePopoverOpen = (event, content) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(content);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverContent("");
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        setOpenDialog(false);
        try {
            await axios.delete(`http://134.209.145.149:9999/api/delete_product/${productToDelete.id}`);
            setProducts(products.filter((p) => p.id !== productToDelete.id));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleEdit = (productId) => {
        navigate(`/addproduct/${productId}`);
    };

    const open = Boolean(anchorEl);

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    if (!Array.isArray(products)) {
        return <Typography>Error: Unexpected data format</Typography>;
    }

    const handleAddProduct = () => {
        navigate("/addproduct");
    };

    return (
        <DashboardCard>
            <ToastContainer />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Product List
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </Button>
                </Box>
            </Box>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Description
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Price
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Images
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Quantity
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <SkeletonLoading />
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                                        <img src={NoData} alt="No data available" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {product.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {product.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {product.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {product.price} {product.currency}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {Array.isArray(product.images) && product.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`product-img-${index}`}
                                                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                                                />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">{product.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={(event) => handlePopoverOpen(event, 'Edit')}
                                            onMouseLeave={handlePopoverClose}
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={(event) => handlePopoverOpen(event, 'Delete')}
                                            onMouseLeave={handlePopoverClose}
                                            onClick={() => handleDelete(product)}
                                        >
                                            <Delete />
                                        </IconButton>
                                        <IconButton
                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={(event) => handlePopoverOpen(event, 'View Details')}
                                            onMouseLeave={handlePopoverClose}
                                        >
                                            <Visibility />
                                        </IconButton>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: 'none',
                                            }}
                                            open={open}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            onClose={handlePopoverClose}
                                            disableRestoreFocus
                                        >
                                            <Box sx={{ p: 1 }}>
                                                <Typography>{popoverContent}</Typography>
                                            </Box>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Box>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the product "{productToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

const SkeletonLoading = () => (
    <>
        {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
                <TableCell colSpan={7}>
                    <Skeleton height={40} />
                </TableCell>
            </TableRow>
        ))}
    </>
);

export default ProductList;
