import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    TextField,
    Button,
    Box,
    Divider,
    Rating,
    FormControl,

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';

import DashboardCard from 'src/components/shared/DashboardCard';

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];

const fadeIn = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const AnimatedCard = styled(Card)`
  animation: fadeIn 0.5s ease-in-out;
  ${fadeIn}
`;
const VenderDetail = () => {
    return (

        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Vender Details
                </Typography>


            </Box>
            {/* <Container> */}
            <ToastContainer />
            <AnimatedCard elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <CardContent>
                    <Grid container spacing={4} alignItems="center" direction="column">





                        <>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>First Name:</strong> a
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Last Name:</strong> a
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Email:</strong> a
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Phone:</strong>a
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Gender:</strong> a
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Zipcode:</strong>a
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Address:</strong> a
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>City:</strong> a
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Date of Birth:</strong> aa
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Gender:</strong> aa
                                    </Typography>
                                </Grid>
                                {/* <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Age:</strong> {profile.age}
                                        </Typography>
                                    </Grid> */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Language:</strong> aa
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Description:</strong>aa
                                    </Typography>
                                </Grid>
                            </Grid>

                        </>

                    </Grid>
                </CardContent>
            </AnimatedCard>



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
                                    Assigned
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default VenderDetail;
