import React ,{ useEffect }  from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Box, IconButton } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import Navbar from './Navbar';
import Footer from './Footer';
import { styled } from '@mui/system';
const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginTop: "21px",
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    textTransform: 'uppercase',
}));
const AgentDetails = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Navbar />
            <div className='container'>
                <StyledTypography variant="h1">Agents Details</StyledTypography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: { xs: 2, md: 4 },
                        minHeight: '80vh',
                        backgroundColor: 'background.default',
                        backgroundImage: 'linear-gradient(to right, #ece9e6, #ffffff)',
                    }}
                >
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            maxWidth: 1000,
                            boxShadow: 7,
                            borderRadius: 3,
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: 10,
                            },
                        }}
                    >
                        {/* Image Section */}
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'grey.100',
                                p: { xs: 3, md: 5 },
                            }}
                        >
                            <Avatar
                                src="https://via.placeholder.com/400" // Replace with the agent's image URL
                                alt="Agent"
                                sx={{
                                    width: { xs: 180, md: 280 },
                                    height: { xs: 180, md: 280 },
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            />
                        </Grid>

                        {/* Details Section */}
                        <Grid
                            item
                            xs={12}
                            md={8}
                            sx={{
                                padding: { xs: 3, md: 5 },
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Agent Name
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    Position: Real Estate Agent
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    Experience: 5 years
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                                    <Email color="primary" />
                                    <Typography variant="body1" color="textSecondary">
                                        agent@example.com
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                                    <Phone color="primary" />
                                    <Typography variant="body1" color="textSecondary">
                                        (123) 456-7890
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="textSecondary" sx={{ mt: 3 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
                                    tortor id pulvinar suscipit, ante lacus fermentum nisl, in lobortis nisi elit eget
                                    felis.
                                </Typography>
                                {/* Add more details as needed */}
                            </CardContent>
                        </Grid>
                    </Card>
                </Box>
            </div>
            <Footer />
        </>
    );
};

export default AgentDetails;
