import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Skeleton,
    Switch,
    Button,
    Modal,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgentList = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    });

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.post('http://localhost:9999/api/userType', { user_type: "AG" });
                console.log(response.data);  // Debugging: Check the structure of the API response
                setAgents(response.data.data);  // Adjust based on actual response structure
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const handleToggleStatus = async (agentId, currentStatus) => {
        try {
            // Toggle the status locally first for responsiveness
            const updatedAgents = agents.map(agent =>
                agent.id === agentId ? { ...agent, status: !currentStatus } : agent
            );
            setAgents(updatedAgents);

            // Update status on the server
            await axios.put(`http://localhost:9999/api/toggle/${agentId}`, {
                // Send any additional data needed in the request body
                // In your case, if no additional data is needed, you can omit this part
            });

            // Show toast notification
            toast.success(`${updatedAgents.find(agent => agent.id === agentId).first_name} is now ${!currentStatus ? 'active' : 'inactive'}.`);
        } catch (err) {
            console.error('Error toggling status:', err);
            toast.error('Failed to update agent status.');
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:9999/api/register', newAgent);
            setAgents([...agents, response.data.data]);  // Adjust based on actual response structure
            handleClose();
            toast.success('New agent added successfully!');
        } catch (err) {
            console.error('Error adding new agent:', err);
            toast.error('Failed to add new agent.');
        }
    };

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    // Check if agents is an array before mapping
    if (!Array.isArray(agents)) {
        return <Typography>Error: Unexpected data format</Typography>;
    }

    return (
        <DashboardCard title="Agent List">
            <ToastContainer /> {/* ToastContainer to display notifications */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add Agent
                </Button>
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
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            agents.map((agent) => (
                                <TableRow key={agent.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {agent.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {agent.first_name} {agent.last_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {agent.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {agent.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: agent.status ? 'success.main' : 'error.main',
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={agent.status ? 'Active' : 'Inactive'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: 'success.main',
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: 'success.main',
                                                },
                                            }}
                                            checked={agent.status}
                                            onChange={() => handleToggleStatus(agent.id, agent.status)}
                                            inputProps={{ 'aria-label': 'toggle agent status' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Box>

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
                        variant="standard"
                        value={newAgent.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAgent.last_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={newAgent.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={newAgent.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAgent.phone}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

export default AgentList;
