import React, { useState } from 'react';
import {
    Button,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    TextField,
    Grid,
    MenuItem,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCard from 'src/components/shared/DashboardCard';

const taxTypes = [
    { id: 1, name: 'GST' },
    { id: 2, name: 'VAT' },
    { id: 3, name: 'Sales Tax' },
];

const specificTaxes = [
    { id: 1, name: 'SGST' },
    { id: 2, name: 'CGST' },
    { id: 3, name: 'IGST' },
];

const SubTaxation = () => {
    const [open, setOpen] = useState(false);
    const [newTax, setNewTax] = useState({ type: '', name: '', percentage: '' });
    const [taxData, setTaxData] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTax((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTax.type || !newTax.name || !newTax.percentage) {
            toast.error('Please fill in all fields');
            return;
        }

        const updatedTaxData = [
            ...taxData,
            { id: taxData.length + 1, ...newTax }
        ];
        setTaxData(updatedTaxData);
        setNewTax({ type: '', name: '', percentage: '' });
        handleClose();
        toast.success('Tax type added successfully!');
    };

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    SubTaxation
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleOpen}
                >
                    Add SubTaxation
                </Button>
            </Box>

            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tax Type
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Sub Tax Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Percentage
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taxData.map((tax) => (
                            <TableRow key={tax.id}>
                                <TableCell>
                                    <Typography variant="subtitle2">{tax.type}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">{tax.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">{tax.percentage}%</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{
                    padding: 20,
                    width: '400px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}>
                    <Typography variant="h6" sx={{ mb: 2 }} gutterBottom>
                        Add New Sub Tax
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Sub Tax Name"
                                    name="name"
                                    value={newTax.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Select Tax "
                                    name="type"
                                    value={newTax.type}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {taxTypes.map((tax) => (
                                        <MenuItem key={tax.id} value={tax.name}>
                                            {tax.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Select Tax Type"
                                    name="type"
                                    value={newTax.type}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {taxTypes.map((tax) => (
                                        <MenuItem key={tax.id} value={tax.name}>
                                            {tax.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                           
                            <Grid item xs={12}>
                                <TextField
                                    label="Tax Percentage"
                                    name="percentage"
                                    value={newTax.percentage}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>

            <ToastContainer />
        </DashboardCard>
    );
};

export default SubTaxation;
