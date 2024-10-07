import React, { useState, useEffect } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    CircularProgress
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import axios from 'axios';

const ProductPerformance = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of users with role_id 2 (Managers) from the API
        axios
            .get('http://134.209.145.149:9999/api/listUser?role_id=2')
            .then((response) => {
                setUsers(response.data.users.slice(0, 7)); // Get only the first 7 users
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    return (
        <DashboardCard title="Customer List">
            {loading ? (
                <CircularProgress />
            ) : (
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
                                        Mobile
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2" fontWeight={600}>
                                       Status
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {users.map((user, index) => (
                                <TableRow key={user.user_id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                                {index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {user.first_name} {user.last_name}
                                                </Typography>
                                              
                                            </Box>
                                        </Box>
                                    </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {/* Assuming `project_name` from the API */}
                                                {user.email || "N/A"}
                                            </Typography>
                                        </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {/* Assuming `project_name` from the API */}
                                                {user.phone || "N/A"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                            <Chip
                                                label={user.status ? 'Active' : 'Inactive'}
                                                color={user.status ? 'success' : 'error'}
                                                sx={{ borderRadius: '4px', fontSize: '0.8rem' }}
                                            />
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
        </DashboardCard>
    );
};

export default ProductPerformance;
