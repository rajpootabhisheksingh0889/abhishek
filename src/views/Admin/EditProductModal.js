import React from 'react';
import {
    Modal, Box, Typography, TextField, Button, IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

const EditProductModal = ({ open, handleClose, productData, handleSave, setProductData }) => {
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setProductData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleNestedInputChange = (e, parentField, field) => {
        const value = e.target.value;
        setProductData(prevData => ({
            ...prevData,
            [parentField]: {
                ...prevData[parentField],
                [field]: value
            }
        }));
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-edit-product-title"
            aria-describedby="modal-edit-product-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: 400,
                    borderRadius: 4,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h3" id="modal-edit-product-title">
                        Edit Product
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={productData.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        value={productData.description}
                        onChange={(e) => handleInputChange(e, 'description')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Category"
                        fullWidth
                        value={productData.category}
                        onChange={(e) => handleInputChange(e, 'category')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="SKU"
                        fullWidth
                        value={productData.sku}
                        onChange={(e) => handleInputChange(e, 'sku')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Price"
                        fullWidth
                        value={productData.price}
                        onChange={(e) => handleInputChange(e, 'price')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Currency"
                        fullWidth
                        value={productData.currency}
                        onChange={(e) => handleInputChange(e, 'currency')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Quantity"
                        fullWidth
                        value={productData.quantity}
                        onChange={(e) => handleInputChange(e, 'quantity')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Brand"
                        fullWidth
                        value={productData.brand}
                        onChange={(e) => handleInputChange(e, 'brand')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                   
                    <TextField
                        label="Depth"
                        fullWidth
                        value={productData.dimensions.depth}
                        onChange={(e) => handleNestedInputChange(e, 'dimensions', 'depth')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Images"
                        fullWidth
                        multiline
                        rows={2}
                        value={productData.images.join('\n')}
                        onChange={(e) => handleInputChange(e, 'images')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Tags"
                        fullWidth
                        value={productData.tags.join(', ')}
                        onChange={(e) => handleInputChange(e, 'tags')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                    <TextField
                        label="Variations"
                        fullWidth
                        multiline
                        rows={2}
                        value={JSON.stringify(productData.variations, null, 2)}
                        onChange={(e) => handleInputChange(e, 'variations')}
                        sx={{ mb: 2, flex: '1 1 300px' }}
                    />
                </Box>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditProductModal;
