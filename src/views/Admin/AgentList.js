import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, TextField,
    FormControl, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, Skeleton, Switch, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoData from "src/assets/images/products/NoData.jpg";

const AgentList = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newAgent, setNewAgent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
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
        }); // Reset form data
    };

    const handleChange = (e) => {
        setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Validate fields before submitting
        let isValid = true;
        const errors = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
        };

        // Check required fields
        if (!newAgent.first_name.trim()) {
            errors.first_name = 'First Name is required';
            isValid = false;
        }
        if (!newAgent.last_name.trim()) {
            errors.last_name = 'Last Name is required';
            isValid = false;
        }
        if (!newAgent.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newAgent.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }
        if (!newAgent.password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        }
        if (!newAgent.phone.trim()) {
            errors.phone = 'Phone is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(newAgent.phone)) {  // Adjust regex based on the required phone number format
            errors.phone = 'Invalid phone number format';
            isValid = false;
        }

        if (!isValid) {
            setFormErrors(errors);
            return; // Exit if any field is empty
        }

        try {
            const response = await axios.post('http://134.209.145.149:9999/api/createAgent', newAgent);
            setAgents([...agents, response.data.data]);  // Adjust based on actual response structure
            setNewAgent({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                phone: '',
            }); // Reset form data
            handleClose();
            toast.success('New agent added successfully!');
        } catch (err) {
            console.error('Error adding new agent:', err);
            toast.error('Failed to add new agent.');
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
                    <TextField
                        size="medium"
                        label="Search Agents"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        <img src={NoData} alt="No data" />
                    </Box>
                )}
            </Box>

            {/* Add Agent Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Agent</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={newAgent.first_name}
                        onChange={handleChange}
                        error={!!formErrors.first_name}
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
                        error={!!formErrors.last_name}
                        helperText={formErrors.last_name}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={newAgent.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={newAgent.password}
                        onChange={handleChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        value={newAgent.phone}
                        onChange={handleChange}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Agent
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

export default AgentList;
