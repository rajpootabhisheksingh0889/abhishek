import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, TextField, Modal,
    FormControl, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, Skeleton, Switch, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import DashboardCard from 'src/components/shared/DashboardCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoData from "src/assets/images/products/NoData.jpg";

const AgentList = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [newAgent, setNewAgent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        otp: '',
    });
    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        otp: '',
    });

    const [selectedOption, setSelectedOption] = useState(12); // Default to 'All'

    useEffect(() => {
        const fetchAgents = async () => {
            setLoading(true); // Set loading to true when fetching new data
            try {
                const response = await axios.post('http://134.209.145.149:9999/api/statusFilter', { status: selectedOption });
                console.log('API Response:', response.data);  // Debugging: Check the structure of the API response
                setAgents(response.data.data);  // Adjust based on actual response structure
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, [selectedOption]); // Re-fetch agents when selectedOption changes

    const handleChange1 = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleToggleStatus = async (agentId, currentStatus) => {
        try {
            // Toggle the status locally first for responsiveness
            const updatedAgents = agents.map(agent =>
                agent.id === agentId ? { ...agent, status: !currentStatus } : agent
            );
            setAgents(updatedAgents);

            // Update status on the server
            await axios.put(`http://134.209.145.149:9999/api/toggle/${agentId}`);

            // Show toast notification
            toast.success(`${updatedAgents.find(agent => agent.id === agentId).first_name} is now ${!currentStatus ? 'active' : 'inactive'}.`);
        } catch (err) {
            console.error('Error toggling status:', err);
            toast.error('Failed to update agent status.');
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setFormErrors({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            otp: '',
        }); // Clear form validation errors on open
    };

    const handleClose = () => {
        setOpen(false);
        setNewAgent({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            otp: '',
        }); // Reset form data
        setOtpSent(false); // Reset OTP sent state
    };

    const handleChange = (e) => {
        setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};
        if (!newAgent.first_name.trim()) {
            errors.first_name = 'First Name is required';
            valid = false;
        }
        if (!newAgent.last_name.trim()) {
            errors.last_name = 'Last Name is required';
            valid = false;
        }
        if (!newAgent.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(newAgent.email)) {
            errors.email = 'Email is not valid';
            valid = false;
        }

        if (!newAgent.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        } else if (!/(?=.*[A-Za-z])(?=.*\W).{6,}/.test(newAgent.password)) {
            errors.password = 'Password must contain at least one alphabet, one special character, and be at least 6 characters long';
            valid = false;
        }
        if (!newAgent.phone.trim()) {
            errors.phone = 'Phone is required';
            valid = false;
        } else if (!/^\d{10}$/.test(newAgent.phone)) {  // Adjust regex based on the required phone number format
            errors.phone = 'Invalid phone number format';
            valid = false;
        }
        if (otpSent) {
            if (!newAgent.otp.trim()) {
                errors.otp = 'OTP is required';
                valid = false;
            }
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!otpSent) {
            handleSendOtp();
        } else {
            setLoading(true);
            try {
                const response = await axios.post('http://134.209.145.149:9999/api/createAgent', newAgent);
                setAgents([...agents, response.data.data]);
                setNewAgent({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    phone: '',
                    otp: '',
                }); // Reset form data
                handleClose();
                toast.success('New agent added successfully!');
            } catch (error) {
                if (error.response) {
                    const apiErrors = error.response.data.errors;
                    if (apiErrors && apiErrors.length > 0) {
                        const errorMessage = apiErrors[0].message || 'An error occurred. Please try again.';
                        toast.error(errorMessage);
                    } else {
                        toast.error('An error occurred. Please try again.');
                    }
                } else if (error.request) {
                    toast.error('No response from server. Please try again later.');
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSendOtp = async () => {
        if (!newAgent.email.trim()) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email is required to send OTP',
            }));
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://134.209.145.149:9999/api/otp', { email: newAgent.email });
            toast.success('OTP sent to your email');
            setOtpSent(true);
        } catch (error) {
            if (error.response) {
                // Extract the specific error message from the API response
                const apiErrors = error.response.data.errors;
                const errorMessage = apiErrors && apiErrors.length > 0 ? apiErrors[0].message : 'Please try again.';
                toast.error(`Failed to send OTP: ${errorMessage}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                toast.error('No response from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };


    const filteredAgents = agents.filter(agent =>
        (selectedOption === 12 || (selectedOption === 1 && agent.status) || (selectedOption === 0 && !agent.status)) && (
            agent.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.phone.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    // Check if agents is an array before mapping
    if (!Array.isArray(agents)) {
        return <Typography>Error: Unexpected data format</Typography>;
    }


    return (
        <DashboardCard>
            <ToastContainer /> {/* ToastContainer to display notifications */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Agent List
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>


                    <TextField
                        size="medium"
                        label="Search Agents"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FormControl variant="outlined" size="medium">
                        <InputLabel>Select</InputLabel>
                        <Select
                            value={selectedOption}
                            onChange={handleChange1}
                            label="Select"
                            sx={{ height: '100%', minWidth: '120px' }} // Adjust height and width as needed
                        >
                            <MenuItem value={12}>All</MenuItem>
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleOpen}
                    // sx={{ height: '100%', minWidth: '100px' }} // Adjust height and width as needed
                    >
                        Add Agent
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
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            // Display skeletons when loading
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            filteredAgents.map((agent) => (
                                <TableRow key={agent.id}>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {agent.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {agent.first_name} {agent.last_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2">
                                            {agent.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2">
                                            {agent.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={agent.status ? 'Active' : 'Inactive'}
                                            color={agent.status ? 'success' : 'error'}
                                            sx={{ borderRadius: '4px', fontSize: '0.8rem' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={agent.status}
                                            onChange={() => handleToggleStatus(agent.id, agent.status)}
                                            color="primary"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {filteredAgents.length === 0 && !loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <img height="400px" src={NoData} alt="No data" />
                    </Box>
                )}
            </Box>

            {/* Add Agent Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Agent</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            name="first_name"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={newAgent.first_name}
                            onChange={handleChange}
                            error={Boolean(formErrors.first_name)}
                            helperText={formErrors.first_name}
                        />
                        <TextField
                            margin="dense"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={newAgent.last_name}
                            onChange={handleChange}
                            error={Boolean(formErrors.last_name)}
                            helperText={formErrors.last_name}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={newAgent.email}
                            onChange={handleChange}
                            error={Boolean(formErrors.email)}
                            helperText={formErrors.email}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="text"
                            fullWidth
                            value={newAgent.password}
                            onChange={handleChange}
                            error={Boolean(formErrors.password)}
                            helperText={formErrors.password}
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            label="Phone"
                            type="text"
                            fullWidth
                            value={newAgent.phone}
                            onChange={handleChange}
                            error={Boolean(formErrors.phone)}
                            helperText={formErrors.phone}
                        />
                        {otpSent && (
                            <TextField
                                margin="dense"
                                name="otp"
                                label="OTP"
                                type="text"
                                fullWidth
                                value={newAgent.otp}
                                onChange={handleChange}
                                error={Boolean(formErrors.otp)}
                                helperText={formErrors.otp}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        variant="contained"
                        color="primary"
                    >
                        {otpSent ? 'Add Agent' : 'Send OTP'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

export default AgentList;